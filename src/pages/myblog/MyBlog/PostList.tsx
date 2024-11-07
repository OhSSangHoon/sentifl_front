import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import * as S from "./Styles/PostList.styles";

interface PostListProps {
  uid: string;
}

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
  thumbnailUrl: string;
}

export const PostDescription = ({ content }: { content: string }) => {
  const MAX_DESCRIPTION_LENGTH = 20;

  const displayedContent =
    content.length > MAX_DESCRIPTION_LENGTH
      ? content.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
      : content;

  return <p>{displayedContent}</p>;
};

const PostList: React.FC<PostListProps> = ({ uid }) => {
  const { uid: loggedInUid } = useAuth();
  const params = useParams<{ uid: string }>();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postContents, setPostContents] = useState<{
    [key: number]: PostContent;
  }>({});
  const [selectedPost, setSelectedPost] = useState<PostContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pageSize = 3;
  const paginationSize = 5;

  // const { uid } = useAuth();
  const navigate = useNavigate();

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const currentPaginationStart =
    Math.floor(page / paginationSize) * paginationSize;

  const handlePostClick = (postId: number) => {
    navigate(`/user/${uid}/post/${postId}`, {});
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allFetchedPosts: Post[] = [];
        let currentPage = 0;
        let lastPage = false;

        while (!lastPage) {
          const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
            params: {
              page: currentPage,
              size: pageSize,
            },
            headers: { Authorization: `Bearer ${loggedInUid}` },
          });

          if (response.status === 200) {
            const data = response.data;

            if (Array.isArray(data.content)) {
              allFetchedPosts.push(...data.content);
              lastPage = data.last;
            } else {
              console.error("예상치 못한 데이터 구조:", data);
              break;
            }

            currentPage += 1;
          } else {
            const errorCode = response.data?.errorCode;
            if (errorCode === "CE1") {
              console.error("엘라스틱서치 요청 실패");
            } else {
              console.error("게시물을 불러올 수 없습니다.");
            }
            break;
          }
        }

        const sortedPosts = allFetchedPosts.sort(
          (a: Post, b: Post) =>
            new Date(b.createdTime).getTime() -
            new Date(a.createdTime).getTime()
        );

        setAllPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [uid, loggedInUid]);

  const fetchPostContent = async (postUrl: string, postId: number) => {
    try {
      const response = await axiosInstance.get(postUrl, {
        headers: { "Cache-Control": "no-cache" }, //캐싱 방지 헤더 추가
      });

      if (response.status === 200) {
        const {
          title,
          content,
          thumbnailUrl,
        }: PostContent & { thumbnailUrl: string } = response.data;
        setPostContents((prevContents) => ({
          ...prevContents,
          [postId]: { title, content, thumbnailUrl },
        }));
      } else {
        console.log("게시물 내용을 불러올 수 없습니다.");
      }
    } catch (error) {
      // console.error("게시물 내용을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 모든 포스트의 내용을 가져오는 코드
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

  const deletePost = async (postId: number) => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(
          `/api/v1/post/${uid}/${postId}`
        );
        if (response.status === 204) {
          const updatedPosts = allPosts.filter(
            (post) => post.postId !== postId
          );
          setAllPosts(updatedPosts);

          // 페이지에 남은 게시물이 없을 경우 이전 페이지로 이동
          if (updatedPosts.length <= page * pageSize && page > 0) {
            setPage((prevPage) => prevPage - 1);
          }

          alert("게시물이 삭제되었습니다.");
        } else if (response.data?.errorCode === "SP3") {
          console.error("게시물 다큐먼트 없음");
          alert("해당 게시물이 없습니다.");
        } else {
          console.error("게시물 삭제 실패:", response);
          alert("게시물 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };

  const editPost = (postId: number) => {
    navigate(`/modify/${postId}`);
  };

  // HTML을 텍스트로 변환하는 함수
  const stripHtmlTags = (htmlContent: string) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
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
                  {postContent?.thumbnailUrl && (
                    <S.PostImage
                      src={postContent.thumbnailUrl}
                      alt="Thumbnail"
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageOverlay(postContent.thumbnailUrl);
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

export default PostList;
