import AWS from "aws-sdk";
import Quill from "quill";
import ImageResize from "quill-image-resize";
import "quill/dist/quill.bubble.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../assets/icons/thumbnail/Thumbnail.webp";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import {
  uploadfinalToS3,
  uploadTempToS3,
  uploadToS3,
} from "../services/s3Service";
import * as S from "./Styles/Editor.style";

Quill.register("modules/imageResize", ImageResize);

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

interface MarkdownEditorProps {
  loadFromTempSave: boolean;
  initialDelta?: any;
  title: string;
  setTitle: (title: string) => void;
  images: Array<{ imageName: string; imageUrl: string }>;
  thumbnailUrl: string | null;
  onModify?: (content: string, thumbnailUrl: string) => void;
  isCreatePage?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  loadFromTempSave,
  initialDelta,
  title,
  setTitle,
  images,
  thumbnailUrl, // 썸네일 URL을 props로 받음
  onModify,
  isCreatePage,
}) => {
  const quillRef = useRef<Quill | null>(null);
  const navigate = useNavigate();
  const { uid } = useAuth();
  const [internalThumbnailUrl, setInternalThumbnailUrl] = useState<
    string | null
  >(thumbnailUrl); // 썸네일 URL을 관리하는 상태

<<<<<<< HEAD
  // FastAPI로 데이터를 전송
=======
  // // FastAPI로 데이터를 전송
>>>>>>> b8b93087408bccb17a13825630a35bd4a582bc54
  // const sendToFastAPI = async (
  //   uid: string,
  //   postUrl: string,
  //   accessToken: string
  // ) => {
  //   try {
  //     const response = await axiosInstance.post(
  //       "http://localhost:8000/create/music", // FastAPI 엔드포인트
  //       {
  //         user_id: uid,
  //         html_url: postUrl,
  //         token: accessToken,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("FastAPI 응답:", response.data);
  //   } catch (error) {
  //     console.error("FastAPI로 데이터 전송 실패:", error);
  //   }
  // };

  // 썸네일 URL이 업데이트되면 내부 상태도 업데이트
  useEffect(() => {
    if (thumbnailUrl) {
      setInternalThumbnailUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  // Quill 에디터 초기화
  useEffect(() => {
    let isMounted = true;

    if (!quillRef.current && isMounted) {
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

      if (initialDelta && quill) {
        quill.root.innerHTML = initialDelta;
      }
    }

    return () => {
      isMounted = false;
    };
  }, [initialDelta]);

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
          } else {
            console.error("Quill editor is not initialized");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  };

  // 썸네일 이미지 직접 업로드 핸들러
  const handleThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        const s3Url = await uploadToS3(file, uid);
        setInternalThumbnailUrl(s3Url);
      } catch (error) {
        console.error("썸네일 이미지 업로드 오류: ", error);
      }
    }
  };

  // Content에서 첫 번째 이미지를 자동으로 썸네일로 설정하는 함수
  const setFirstContentImageAsThumbnail = () => {
    const editor = quillRef.current;
    if (editor) {
      const editorHtml = editor.root.innerHTML;
      const imgTagMatch = editorHtml.match(/<img[^>]+src="([^">]+)"/); // 첫 번째 이미지 src 추출

      if (imgTagMatch && imgTagMatch[1]) {
        setInternalThumbnailUrl(imgTagMatch[1]);
      }
    }
  };

  // 임시 저장 핸들러
  const handleTemporarySave = async () => {
    if (!quillRef.current) {
      console.log("Quill editor is not initialized.");
      return;
    }

    if (!title || (quillRef.current?.getLength() || 0) <= 1) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const editorContent = quillRef.current.getContents();
    const editorDelta = JSON.stringify(editorContent);

    // 썸네일이 없을 경우 첫 번째 이미지로 설정
    if (!internalThumbnailUrl) {
      setFirstContentImageAsThumbnail();
    }

    const jsonContent = {
      title: title,
      content: editorDelta,
      thumbnailUrl: internalThumbnailUrl || "",
    };

    try {
      const s3Url = await uploadTempToS3(jsonContent, uid);
      console.log("File uploaded to S3:", s3Url);
      navigate("/");
    } catch (error) {
      console.error("Error uploading temp file to S3:", error);
    }
  };

  // 최종 저장 핸들러
  const handleSave = async () => {
    if (!quillRef.current) {
      console.log("Quill 에디터가 초기화되지 않았습니다.");
      return;
    }

    if (!title || (quillRef.current?.getLength() || 0) <= 1) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 썸네일 이미지가 없을 경우, content에서 첫 번째 이미지를 썸네일로 사용
    if (!internalThumbnailUrl) {
      setFirstContentImageAsThumbnail();
    }

    const editorHtml = quillRef.current.root.innerHTML;

    const fileTitle = title
      ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "untitled";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const jsonFileName = `${fileTitle}_${timestamp}.json`;

    const jsonContent = {
      title: title,
      content: editorHtml,
      thumbnailUrl: internalThumbnailUrl || "",
    };

    try {
      const jsonBlob = new Blob([JSON.stringify(jsonContent, null, 2)], {
        type: "application/json",
      });

      const s3Url = await uploadfinalToS3(
        new File([jsonBlob], jsonFileName),
        uid
      );

      const postData = {
        postUrl: s3Url,
        thumbnailUrl: internalThumbnailUrl || "",
      };

      const response = await axiosInstance.post(`/post/${uid}`, postData, {});

      if (response.status === 200) {
        alert("게시물이 성공적으로 저장되었습니다.");

        // await sendToFastAPI(uid, s3Url, accessToken);
<<<<<<< HEAD

=======
>>>>>>> b8b93087408bccb17a13825630a35bd4a582bc54

        navigate(`/user/${uid}/blog`);
      }
    } catch (error) {
      console.error("게시물 저장 실패:", error);
      alert("게시물 저장에 실패했습니다.");
    }
  };

  const handleModify = () => {
    if (quillRef.current && onModify) {
      const content = quillRef.current.root.innerHTML;
      onModify(content, internalThumbnailUrl || "");
    }
  };

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
          {isCreatePage ? (
            <>
              <button onClick={handleSave}>저장</button>
              <button onClick={handleTemporarySave}>임시저장</button>
            </>
          ) : (
            <>
              <button onClick={handleModify}>수정</button>
            </>
          )}
        </S.SaveBtn>
        <S.TitleInput
          hasThumbnail={!!internalThumbnailUrl}
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.ThumbnailWrapper>
          <S.ThumbnailImg src={Thumbnail} />
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

export default MarkdownEditor;
