import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import MarkdownEditor from "../../Editor/MarkdownEditor"; // Quill 기반 에디터
import * as S from './Styles/Create.style';


interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
}

const ModifyPage = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId 추출
  const { uid } = useAuth(); // 사용자의 uid 가져오기
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | null>(null); // 게시물 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 1. 사용자의 게시물 목록을 가져옴
        const response = await axiosInstance.get(`/post/${uid}`);
        if (response.status === 200) {
          const postList = response.data.content;

          // 2. postId에 맞는 게시물 찾기
          const selectedPost = postList.find((p: any) => p.postId === Number(postId));

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;

            // 3. postUrl로 게시물 내용 가져오기 (S3에서)
            const postContentResponse = await axiosInstance.get(postUrl);
            if (postContentResponse.status === 200) {
              const { title, content } = postContentResponse.data;

              // 게시물 데이터를 상태에 저장
              setPost({
                title,
                content,
                thumbnailUrl,
              });
            }
          } else {
            console.error("해당 postId에 맞는 게시글을 찾을 수 없습니다.");
          }
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    if (postId) {
      fetchPostData(); // postId가 있을 때만 게시물 데이터 가져오기
    }
  }, [postId, uid]);

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
        images={[]} // 이미지 데이터는 필요에 따라 처리
        thumbnailUrl={post.thumbnailUrl} // 썸네일 URL
        onSave={async (updatedContent: string, updatedThumbnailUrl: string) => {
          // 수정된 게시물 저장
          const updatedPost = {
            title: post.title,
            content: updatedContent,
            thumbnailUrl: updatedThumbnailUrl,
          };

          try {
            const response = await axiosInstance.put(`/post/${uid}/${postId}`, updatedPost);
            if (response.status === 200) {
              alert("게시물이 성공적으로 수정되었습니다.");
              navigate(`/user/${uid}/post/${postId}`); // 수정 후 해당 게시물 페이지로 이동
            }
          } catch (error) {
            console.error("게시물 수정 실패:", error);
            alert("게시물 수정에 실패했습니다.");
          }
        }}
      />
    </S.Main>
  );
};

export default ModifyPage;
