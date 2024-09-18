import Quill from "quill";
import ImageResize from "quill-image-resize";
import "quill/dist/quill.bubble.css"; // Quill 기본 스타일
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../assets/icons/thumbnail/Thumbnail.webp";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import { uploadfinalToS3, uploadToS3 } from "../services/s3Service";
import * as S from "./Styles/Editor.style";


Quill.register("modules/imageResize", ImageResize);

interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
}

const ModifyPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { uid } = useAuth();
  const navigate = useNavigate();
  const quillRef = useRef<Quill | null>(null); // Quill 인스턴스에 접근하기 위한 ref

  const [post, setPost] = useState<PostData | null>(null); // 게시물 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [title, setTitle] = useState<string>(""); // 제목을 저장할 상태
  const [internalThumbnailUrl, setInternalThumbnailUrl] = useState<string | null>(null); // 썸네일 URL 상태

  // 게시물 데이터를 불러오는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 1. 특정 사용자의 게시물 목록에서 해당 postId로 게시물 정보 가져오기
        const response = await axiosInstance.get(`/post/${uid}`); // uid로 게시물 목록 가져오기
        if (response.status === 200) {
          const postList = response.data.content;

          // 2. postId에 해당하는 게시물 찾기
          const selectedPost = postList.find((p: any) => p.postId === Number(postId));

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;

            // 3. postUrl로 게시글 내용 가져오기 (S3에서)
            const postContentResponse = await axiosInstance.get(postUrl);
            if (postContentResponse.status === 200) {
              const { title, content } = postContentResponse.data;

              // 가져온 데이터를 상태에 저장
              setPost({
                title,
                content,
                thumbnailUrl,
              });

              setTitle(title); // 제목 상태 업데이트
              setInternalThumbnailUrl(thumbnailUrl); // 썸네일 상태 업데이트

              // Quill 에디터에 콘텐츠 설정
              if (quillRef.current) {
                const delta = quillRef.current.clipboard.convert(content); // HTML을 Delta로 변환
                quillRef.current.setContents(delta); // Delta 형식으로 Quill에 설정
              }
            }
          } else {
            console.error("해당 postId에 맞는 게시글을 찾을 수 없습니다.");
          }
        } else {
          console.error("게시물 목록을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, uid]);

  // Quill 에디터 초기화
  useEffect(() => {
    if (!quillRef.current && document.getElementById("editor")) {
      const quill = new Quill("#editor", {
        theme: "bubble",
        modules: {
          toolbar: {
            container: [
              [{ header: 2 }],
              [{ header: 3 }],
              ["bold", "italic", "underline", "strike"],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize"],
          },
          history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
          },
        },
      });
      quillRef.current = quill;
    }
  }, []); // Quill 초기화는 한 번만 실행

  // 이미지 업로드 핸들러
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        try {
          const s3Url = await uploadToS3(file, uid);
          const editor = quillRef.current;
          if (editor) {
            const range = editor.getSelection(true);
            if (range) {
              editor.insertEmbed(range.index, "image", s3Url); // S3 URL 삽입
            }
          }
        } catch (error) {
          console.error("이미지 업로드 오류:", error);
        }
      }
    };
  };

  // 썸네일 이미지 업로드 핸들러
  const handleThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const s3Url = await uploadToS3(file, uid);
        setInternalThumbnailUrl(s3Url); // 썸네일 상태 업데이트
      } catch (error) {
        console.error("썸네일 이미지 업로드 오류:", error);
      }
    }
  };

  // 최종 저장 핸들러
  const handleSave = async () => {
    if (!quillRef.current) {
      console.log("Quill 에디터가 초기화되지 않았습니다.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!title || (quillRef.current?.getLength() || 0) <= 1) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const editorHtml = quillRef.current.root.innerHTML; // HTML 콘텐츠 가져오기
    const jsonContent = {
      title,
      content: editorHtml,
      thumbnailUrl: internalThumbnailUrl || "",
    };

    try {
      const jsonBlob = new Blob([JSON.stringify(jsonContent)], { type: "application/json" });
      const file = new File([jsonBlob], "post_content.json", { type: "application/json", lastModified: Date.now() });

      const s3Url = await uploadfinalToS3(file, uid); // Blob을 File로 변환하여 업로드

      const postData = {
        postUrl: s3Url,
        thumbnailUrl: internalThumbnailUrl || "",
      };

      const response = await axiosInstance.post(`/post/${uid}`, postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert("게시물이 성공적으로 저장되었습니다.");
        navigate(`/user/${uid}/blog`);
      }
    } catch (error) {
      console.error("게시물 저장 실패:", error);
      alert("게시물 저장에 실패했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.EditorWrapper>
      <S.TitleWrapper
        style={{
          backgroundImage: internalThumbnailUrl
            ? `url(${internalThumbnailUrl})`
            : "none",
        }}
      >
        <S.SaveBtn>
          <button onClick={handleSave}>저장</button>
        </S.SaveBtn>
        <S.TitleInput
          hasThumbnail={!!internalThumbnailUrl}
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.ThumbnailWrapper>
          <S.ThumbnailImg src={Thumbnail || ""} />
          <S.ThumbnailInput
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
          />
        </S.ThumbnailWrapper>
      </S.TitleWrapper>
      <S.EditorContainer>
        <S.Editor id="editor" />
      </S.EditorContainer>
    </S.EditorWrapper>
  );
};
export default ModifyPage;