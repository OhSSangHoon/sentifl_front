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
  const accessToken = localStorage.getItem("accessToken");

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hashTag, setHashTag] = useState<string>("");
  const [initialThumbnailUrl, setInitialThumbnailUrl] = useState<string | null>(null);


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
            setInitialThumbnailUrl(thumbnailUrl);

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
  }, [postId, uid, initialThumbnailUrl]);

  const handleModify = async (content: string, updatedThumbnailUrl: string) => {
    try {
        if (!post || !post.postUrl) {
            alert("게시물 URL이 유효하지 않습니다.");
            return;
        }
  
        const isThumbnailUpdated = updatedThumbnailUrl.trim() !== initialThumbnailUrl?.trim()
        const finalThumbnailUrl = isThumbnailUpdated ? updatedThumbnailUrl : post.thumbnailUrl;

        const jsonContent = {
            title: post.title,
            content,
            thumbnailUrl: finalThumbnailUrl,
            hashTag,
        };
  
        const jsonBlob = new Blob([JSON.stringify(jsonContent)], {
            type: "application/json",
        });
        
        // 썸네일이 변경된 경우에만 기존 썸네일을 삭제한다.
        await updateToS3(new File([jsonBlob], "updated_post.json"), post.postUrl, isThumbnailUpdated ? initialThumbnailUrl : null);

        // Update post details
        const postResponse = await axiosInstance.put(
            `/api/v1/post/${uid}/${postId}`,
            {
                title: jsonContent.title,
                postUrl: post.postUrl,
                thumbnailUrl: finalThumbnailUrl,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json;charset=UTF-8",
                },
            }
        );

        if (postResponse.status === 201 || postResponse.status === 204) {
            // Update hashtags
            const hashtagResponse = await axiosInstance.put(
                `/api/v1/post/${postId}/hashtag`,
                { hashTag },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                }
            );

            if (hashtagResponse.status === 201 || hashtagResponse.status === 204) {
                alert("게시물이 성공적으로 수정되었습니다.");
                setInitialThumbnailUrl(finalThumbnailUrl);
                navigate(`/user/${uid}/post/${postId}`);
            } else {
                alert("해시태그 수정에 실패했습니다.");
            }
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