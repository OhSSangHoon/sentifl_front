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

  // HTML에서 이미지와 텍스트를 분리하는 함수
  const extractImageAndText = (htmlContent: string) => {
    const imageRegex = /<img[^>]+src="([^">]+)"/g;
    const images: string[] = [];
    let match;
    while ((match = imageRegex.exec(htmlContent)) !== null) {
      images.push(match[1]); // src 속성의 값을 추출
    }
    // 이미지 태그를 제거한 텍스트 내용 추출
    const textContent = htmlContent.replace(/<img[^>]*>/g, "");
    return { images, textContent };
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/post/${uid}`, {
          params: {
            page: page, // 현재 페이지 번호
            size: pageSize, // 페이지당 게시물 수
          },
        });

        const { content, totalPages, first, last } = response.data;
        setPosts(content);
        setTotalPages(totalPages); // 전체 페이지 수 설정
        setFirst(first); // 첫 페이지 여부 설정
        setLast(last); // 마지막 페이지 여부 설정
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]); // page 상태가 변경될 때마다 새로 호출

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

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <S.Content>
        {posts.map((post, postIndex) => {
          const { images, textContent } = extractImageAndText(post.content); // 이미지와 텍스트 분리

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
                      <S.ActionButton>추가</S.ActionButton>
                      <S.ActionButton>삭제</S.ActionButton>
                      <S.HeartIcon>❤ count</S.HeartIcon>
                    </S.PostMeta>
                  </S.PostHeader>
                  {/* 분리된 텍스트 내용 렌더링 */}
                  <S.PostDescription
                    dangerouslySetInnerHTML={{ __html: textContent }}
                  />
                </S.PostInfo>
                {/* 분리된 이미지들을 렌더링 */}
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

      {/* 이미지 클릭 시 오버레이 */}
      {selectedImage && (
        <S.Overlay onClick={closeImageOverlay}>
          <S.OverlayImage src={selectedImage} alt="Selected" />
        </S.Overlay>
      )}

      {/* 페이지네이션 버튼 */}
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
