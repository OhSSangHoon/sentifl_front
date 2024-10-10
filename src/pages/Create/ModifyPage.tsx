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
  const { postId } = useParams<{ postId: string }>();
  const { uid } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hashTag, setHashTag] = useState<string>("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
          params: { page: 0, size: 10 },
        });

        if (response.status === 200) {
          const selectedPost = response.data.content.find(
            (p: any) => p.postId === Number(postId)
          );

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;

            const postContentResponse = await axiosInstance.get(postUrl);
            if (postContentResponse.status === 200) {
              const { title, content } = postContentResponse.data;
              setPost({ title, content, thumbnailUrl, postUrl });
            }

            const hashtagResponse = await axiosInstance.get(
              `/api/v1/post/${postId}/hashtag`
            );
            if (hashtagResponse.status === 200) {
              setHashTag(hashtagResponse.data.join(" "));
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
      if (!post || !post.postUrl) {
        alert("게시물 URL이 유효하지 않습니다.");
        return;
      }

      const jsonContent = {
        title: post.title,
        content,
        thumbnailUrl,
        hashTag,
      };

      const jsonBlob = new Blob([JSON.stringify(jsonContent)], {
        type: "application/json",
      });
      await updateToS3(new File([jsonBlob], "updated_post.json"), post.postUrl);

      const response = await axiosInstance.put(
        `/api/v1/post/${uid}/${postId}`,
        {
          title: post.title,
          postUrl: post.postUrl,
          thumbnailUrl,
          hashTag,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      if (response.status === 201) {
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
        images={[]}
        thumbnailUrl={post.thumbnailUrl}
        onModify={handleModify}
        isCreatePage={false}
        hashTag={hashTag}
        setHashTag={setHashTag}
      />
    </S.Main>
  );
};

export default ModifyPage;