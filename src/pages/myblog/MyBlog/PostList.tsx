import React, { useEffect, useState } from "react";
import * as S from "./Styles/PostList.styles";
import axiosInstance from "../../../axiosInterceptor";
import { useAuth } from "../../../AuthProvider";

interface Post {
  postId: number;
  title: string;
  content: string;
  time: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [first, setFirst] = useState(true); // 첫 페이지 여부
  const [last, setLast] = useState(false); // 마지막 페이지 여부
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 클릭된 이미지 URL
  const pageSize = 3; // 페이지당 게시물 수

  const { uid } = useAuth();

  const extractImageAndText = (htmlContent: string) => {
    const imageRegex = /<img[^>]+src="([^">]+)"/g;
    const images: string[] = [];
    let match;
    while ((match = imageRegex.exec(htmlContent)) !== null) {
      images.push(match[1]);
    }
    const textContent = htmlContent.replace(/<img[^>]*>/g, "");
    return { images, textContent };
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/post/${uid}`, {
          params: {
            page: page,
            size: pageSize,
          },
        });

        if (response.status === 200) {
          const { content, totalPages, first, last } = response.data;
          setPosts(content);
          setTotalPages(totalPages);
          setFirst(first);
          setLast(last);
        } else {
          console.log("게시물을 불러올 수 없습니다.");
        }
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handlePrevPage = () => {
    if (!first) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (!last) {
      setPage(page + 1);
    }
  };

  const openImageOverlay = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageOverlay = () => {
    setSelectedImage(null);
  };

  const deletePost = async (postId: number) => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/post/${postId}`);
        const updatedPosts = posts.filter((post) => post.postId !== postId);

        // 남아있는 게시물의 수가 페이지 크기보다 적으면 다음 페이지 게시물 가져오기
        if (updatedPosts.length < pageSize && !last) {
          const response = await axiosInstance.get(`/post/${uid}`, {
            params: {
              page: page + 1,
              size: pageSize - updatedPosts.length, // 부족한 게시물 수만큼 가져오기
            },
          });

          const { content } = response.data;
          setPosts([...updatedPosts, ...content]); // 기존 게시물과 새로운 게시물 결합
        } else {
          setPosts(updatedPosts); // 부족하지 않으면 기존 업데이트
        }

        alert("게시물이 삭제되었습니다.");
      } catch (err) {
        console.error("게시물을 삭제하는 중 오류 발생:", err);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <S.Content>
        {posts.map((post, postIndex) => {
          const { images, textContent } = extractImageAndText(post.content);

          return (
            <S.Post key={post.postId}>
              <S.PostContentWrapper>
                <S.PostInfo>
                  <S.PostHeader>
                    <S.PostTitle>{post.title}</S.PostTitle>
                    <S.PostMeta>
                      <S.PostDate>
                        {new Date(post.time).toLocaleDateString()}
                      </S.PostDate>
                      <S.ActionButton>수정</S.ActionButton>
                      <S.ActionButton onClick={() => deletePost(post.postId)}>
                        삭제
                      </S.ActionButton>
                      <S.HeartIcon>❤ count</S.HeartIcon>
                    </S.PostMeta>
                  </S.PostHeader>
                  <S.PostDescription
                    dangerouslySetInnerHTML={{ __html: textContent }}
                  />
                </S.PostInfo>
                {images.map((src, index) => (
                  <S.PostImage
                    key={index}
                    src={src}
                    alt={`Post Image ${index}`}
                    onClick={() => openImageOverlay(src)}
                  />
                ))}
              </S.PostContentWrapper>
            </S.Post>
          );
        })}
      </S.Content>

      {selectedImage && (
        <S.Overlay onClick={closeImageOverlay}>
          <S.OverlayImage src={selectedImage} alt="Selected" />
        </S.Overlay>
      )}

      <S.PaginationWrapper>
        <S.PageButton onClick={handlePrevPage} disabled={first}>
          이전
        </S.PageButton>
        <S.PageNumber>
          {page + 1} / {totalPages}
        </S.PageNumber>
        <S.PageButton onClick={handleNextPage} disabled={last}>
          다음
        </S.PageButton>
      </S.PaginationWrapper>
    </>
  );
};

export default PostList;
