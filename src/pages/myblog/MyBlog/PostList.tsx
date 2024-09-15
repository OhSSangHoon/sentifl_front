import React, { useEffect, useState } from "react";
import * as S from "./Styles/PostList.styles";
import axiosInstance from "../../../axiosInterceptor";
import { useAuth } from "../../../AuthProvider";
import { useNavigate } from "react-router-dom";

interface Post {
  postId: number;
  title: string;
  content?: string;
  time: string;
}

const PostList = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pageSize = 3; // 한 페이지에 3개의 포스트 표시
  const paginationSize = 5; // 페이지네이션 숫자 버튼의 크기

  const { uid } = useAuth();
  const navigate = useNavigate();

  const totalPages = Math.ceil(allPosts.length / pageSize); // 총 페이지 수 계산
  const currentPaginationStart =
    Math.floor(page / paginationSize) * paginationSize;

  const handlePostClick = (postId: number) => {
    navigate(`/user/${uid}/post/${postId}`);
  };

  const extractImageAndText = (htmlContent: string = "") => {
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
    const fetchAllPosts = async () => {
      try {
        const allFetchedPosts: Post[] = [];
        let currentPage = 0;
        let lastPage = false;

        while (!lastPage) {
          const response = await axiosInstance.get(`/post/${uid}`, {
            params: {
              page: currentPage,
              size: pageSize,
            },
          });

          if (response.status === 200) {
            const data = response.data;

            if (Array.isArray(data)) {
              allFetchedPosts.push(...data);
              lastPage = true;
            } else if (data.content && Array.isArray(data.content)) {
              allFetchedPosts.push(...data.content);
              lastPage = data.last;
            } else {
              console.error("예상치 못한 데이터 구조:", data);
              break;
            }

            currentPage += 1;
          } else {
            console.log("게시물을 불러올 수 없습니다.");
            break;
          }
        }

        // 최신순으로 정렬
        const sortedPosts = allFetchedPosts.sort(
          (a: Post, b: Post) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setAllPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [uid]);

  const handlePrevPageGroup = () => {
    if (currentPaginationStart > 0) {
      setPage(currentPaginationStart - paginationSize);
    }
  };

  const handleNextPageGroup = () => {
    if (currentPaginationStart + paginationSize < totalPages) {
      setPage(currentPaginationStart + paginationSize);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setPage(pageIndex);
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
        const updatedPosts = allPosts.filter((post) => post.postId !== postId);
        setAllPosts(updatedPosts);
        alert("게시물이 삭제되었습니다.");
      } catch (err) {
        console.error("게시물을 삭제하는 중 오류 발생:", err);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  const editPost = (postId: number) => {
    navigate(`/modify/${postId}`);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  const displayedPosts = allPosts.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <>
      <S.Content>
        {displayedPosts.length === 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          displayedPosts.map((post) => {
            const { images, textContent } = extractImageAndText(
              post.content || ""
            );

            return (
              <S.Post key={post.postId}>
                <S.PostContentWrapper>
                  <S.PostInfo>
                    <S.PostHeader>
                      <S.PostTitle onClick={() => handlePostClick(post.postId)}>
                        {post.title}
                      </S.PostTitle>
                      <S.PostMeta>
                        <S.PostDate>
                          {new Date(post.time).toLocaleDateString()}
                        </S.PostDate>
                        <S.ActionButton onClick={() => editPost(post.postId)}>
                          수정
                        </S.ActionButton>
                        <S.ActionButton
                          onClick={(event) => {
                            event.stopPropagation();
                            deletePost(post.postId);
                          }}
                        >
                          삭제
                        </S.ActionButton>
                        <S.HeartIcon>❤</S.HeartIcon>
                      </S.PostMeta>
                    </S.PostHeader>
                    <S.PostDescription
                      onClick={() => handlePostClick(post.postId)}
                    >
                      {textContent}
                    </S.PostDescription>
                  </S.PostInfo>
                  {images.map((src, index) => (
                    <S.PostImage
                      key={index}
                      src={src}
                      alt={`Post Image ${index}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageOverlay(src);
                      }}
                    />
                  ))}
                </S.PostContentWrapper>
              </S.Post>
            );
          })
        )}
      </S.Content>

      {selectedImage && (
        <S.Overlay onClick={closeImageOverlay}>
          <S.OverlayImage src={selectedImage} alt="Selected" />
        </S.Overlay>
      )}

      <S.PaginationWrapper>
        <S.PageButton
          onClick={handlePrevPageGroup}
          disabled={currentPaginationStart === 0}
        >
          &lt;
        </S.PageButton>
        {Array.from(
          {
            length: Math.min(
              paginationSize,
              totalPages - currentPaginationStart
            ),
          },
          (_, idx) => {
            const pageIndex = currentPaginationStart + idx;
            return (
              <S.PageButton
                key={pageIndex}
                onClick={() => handlePageClick(pageIndex)}
                active={pageIndex === page}
              >
                {pageIndex + 1}
              </S.PageButton>
            );
          }
        )}
        <S.PageButton
          onClick={handleNextPageGroup}
          disabled={currentPaginationStart + paginationSize >= totalPages}
        >
          &gt;
        </S.PageButton>
      </S.PaginationWrapper>
    </>
  );
};

export default PostList;
