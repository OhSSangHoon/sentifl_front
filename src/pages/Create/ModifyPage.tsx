import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import MarkdownEditor from "../../Editor/MarkdownEditor";
import { updateToS3 } from "../../services/s3Service";
import * as S from "./Styles/Create.style";

interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
  postUrl: string;
}

const ModifyPage = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId 추출
  const { uid } = useAuth(); // 사용자의 uid 가져오기
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/post/${uid}`);
        if (response.status === 200) {
          const postList = response.data.content;
          const selectedPost = postList.find(
            (p: any) => p.postId === Number(postId)
          );

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;
            const postContentResponse = await axiosInstance.get(postUrl);
            if (postContentResponse.status === 200) {
              const { title, content } = postContentResponse.data;
              setPost({ title, content, thumbnailUrl, postUrl });
            }
          }
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

  const handleModify = async (content: string, thumbnailUrl: string) => {
    try {
      const postUrl = post?.postUrl; // 게시물의 S3 URL을 가져옴

      if (!postUrl) {
        console.error("postUrl is not valid:", postUrl);
        alert("유효하지 않은 postUrl입니다. 게시물 수정에 실패했습니다.");
        return; // postUrl이 유효하지 않으면 함수 종료
      }

      // 수정된 게시물 내용을 JSON으로 구성
      const jsonContent = {
        title: post?.title || "",
        content,
        thumbnailUrl,
      };

      // 1. S3에 수정된 파일 덮어쓰기
      const jsonBlob = new Blob([JSON.stringify(jsonContent, null, 2)], {
        type: "application/json",
      });

      await updateToS3(new File([jsonBlob], "updated_post.json"), postUrl);

      // 2. 서버로 PUT 요청 보내기
      const response = await axiosInstance.put(`/post/${uid}/${postId}`, {
        postUrl,
        thumbnailUrl,
      });

      if (response.status === 200) {
        alert("게시물이 성공적으로 수정되었습니다.");
        navigate(`/user/${uid}/post/${postId}`);
      } else {
        alert("게시물 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      alert("게시물 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중 문제가 발생했습니다.</p>;
  }

  return (
    <S.Main>
      <MarkdownEditor
        loadFromTempSave={false}
        initialDelta={post.content}
        title={post.title}
        setTitle={(newTitle) => setPost({ ...post, title: newTitle })}
        images={[]} // 필요에 따라 이미지 처리
        thumbnailUrl={post.thumbnailUrl}
        onModify={handleModify} // 수정 핸들러 전달
        isCreatePage={false}
      />
    </S.Main>
  );
};

export default ModifyPage;
