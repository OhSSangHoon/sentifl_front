import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 기본 스타일
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import * as S from "./Styles/Editor.style";

interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
}

function ModPost() {
  const { postId } = useParams<{ postId: string }>();
  const { uid } = useAuth();
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null); // Quill 인스턴스에 접근하기 위한 ref

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/post/${uid}`); // uid로 게시물 목록 가져오기
        if (response.status === 200) {
          const postList = response.data.content;

          const selectedPost = postList.find((p: any) => p.postId === Number(postId));

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;

            const postContentResponse = await axiosInstance.get(postUrl);
            if (postContentResponse.status === 200) {
              const { title, content } = postContentResponse.data;

              setPost({
                title,
                content,
                thumbnailUrl,
              });

              // Quill 에디터에 값 설정
              if (quillRef.current) {
                quillRef.current.getEditor().setContents(content); // content를 Quill에 설정
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
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, uid]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중 문제가 발생했습니다.</p>;
  }

  return (
    <S.EditorWrapper>
      <h1>{post.title}</h1>
      <ReactQuill ref={quillRef} theme="snow" readOnly={false} />
      <button
        onClick={() => {
          const quillEditor = quillRef.current?.getEditor();
          const content = quillEditor?.getContents();
          console.log("Current Quill Content:", content);
          // 저장 로직 추가 가능
        }}
      >
        저장하기
      </button>
    </S.EditorWrapper>
  );
}

export default ModPost;