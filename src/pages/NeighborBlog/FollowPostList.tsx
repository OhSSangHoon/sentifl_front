// FollowPostList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/FollowPostList.style";

export interface Post {
  postId: number;
  postUrl: string;
  thumbnailUrl: string;
  createdTime: string;
  modifiedTime: string;
  totalLikes: number;
  totalViews: number;
}

export interface PostContent {
  title: string;
  content: string;
}

export const PostDescription = ({ content }: { content: string }) => {
  const MAX_DESCRIPTION_LENGTH = 800; // 글자 수 제한

  const displayedContent =
    content.length > MAX_DESCRIPTION_LENGTH
      ? content.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
      : content;

  return <p>{displayedContent}</p>;
};

const FollowPostList = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postContents, setPostContents] = useState<{
    [key: number]: PostContent;
  }>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pageSize = 3;
  const paginationSize = 5;

  const { uid } = useAuth();
  const navigate = useNavigate();

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const currentPaginationStart =
    Math.floor(page / paginationSize) * paginationSize;

  const handlePostClick = (postId: number) => {
    navigate(`/follow/post/${postId}`); // 경로 수정
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
          params: {
            page: page,
            size: pageSize,
          },
        });

        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data.content)) {
            setAllPosts(data.content);
          } else {
            console.error("예상치 못한 데이터 구조:", data);
          }

          setLoading(false);
        } else {
          console.log("팔로우한 사용자의 게시물을 불러올 수 없습니다.");
        }
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [page]);

  const fetchPostContent = async (postUrl: string, postId: number) => {
    try {
      const response = await axiosInstance.get(postUrl);
      if (response.status === 200) {
        const { title, content }: PostContent = response.data;
        setPostContents((prevContents) => ({
          ...prevContents,
          [postId]: { title, content },
        }));
      } else {
        console.log("게시물 내용을 불러올 수 없습니다.");
      }
    } catch (error) {
      // console.error("게시물 내용을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    allPosts.forEach((post) => {
      if (!postContents[post.postId]) {
        fetchPostContent(post.postUrl, post.postId);
      }
    });
  }, [allPosts]);

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
            const postContent = postContents[post.postId];
            return (
              <S.Post key={post.postId}>
                <S.PostContentWrapper>
                  <S.PostInfo>
                    <S.PostHeader>
                      <S.PostTitle onClick={() => handlePostClick(post.postId)}>
                        {postContent?.title || "제목 불러오는 중..."}
                      </S.PostTitle>
                      <S.PostMeta>
                        <S.PostDate>
                          {post.modifiedTime
                            ? new Date(post.modifiedTime).toLocaleDateString()
                            : new Date(post.createdTime).toLocaleDateString()}
                        </S.PostDate>
                      </S.PostMeta>
                    </S.PostHeader>
                    <S.PostDescription
                      onClick={() => handlePostClick(post.postId)}
                    >
                      <PostDescription
                        content={stripHtmlTags(
                          postContent?.content || "내용 불러오는 중..."
                        )}
                      />
                    </S.PostDescription>
                  </S.PostInfo>
                  {post.thumbnailUrl && (
                    <S.PostImage
                      src={post.thumbnailUrl}
                      alt="Thumbnail"
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageOverlay(post.thumbnailUrl);
                      }}
                    />
                  )}
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

export default FollowPostList;

// HTML을 텍스트로 변환하는 함수
const stripHtmlTags = (htmlContent: string) => {
  const doc = new DOMParser().parseFromString(htmlContent, "text/html");
  return doc.body.textContent || "";
};
