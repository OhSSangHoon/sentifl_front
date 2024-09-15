import React, { useEffect, useState } from "react";
import * as S from "./Styles/PostList.styles";
import axiosInstance from "../../../axiosInterceptor";
import { useAuth } from "../../../AuthProvider";
import { useNavigate } from "react-router-dom";

interface Post {
  postId: number;
  title: string;
  content: string;
  time: string;
}

const PostList = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pageSize = 3; // 페이지당 게시물 수

  const { uid } = useAuth();
  const navigate = useNavigate();
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

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
            const { content, last } = response.data;
            allFetchedPosts.push(...content); // 게시물을 병합
            lastPage = last; // 마지막 페이지 확인
            currentPage += 1; // 다음 페이지로 이동
          } else {
            console.log("게시물을 불러올 수 없습니다.");
            break;
          }
        }

        // 모든 데이터를 병합한 후 최신순으로 정렬
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

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * pageSize < allPosts.length) {
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
        const updatedPosts = allPosts.filter((post) => post.postId !== postId);
        setAllPosts(updatedPosts); // 삭제 후 전체 게시물 업데이트
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

  // 현재 페이지에 해당하는 게시물만 표시
  const displayedPosts = allPosts.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <>
      <S.Content>
        {displayedPosts.map((post, postIndex) => {
          const { images, textContent } = extractImageAndText(post.content);

          return (
            <S.Post
              key={post.postId}
              onClick={() => handlePostClick(post.postId)}
            >
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
        <S.PageButton onClick={handlePrevPage} disabled={page === 0}>
          이전
        </S.PageButton>
        <S.PageNumber>
          {page + 1} / {Math.ceil(allPosts.length / pageSize)}
        </S.PageNumber>
        <S.PageButton
          onClick={handleNextPage}
          disabled={(page + 1) * pageSize >= allPosts.length}
        >
          다음
        </S.PageButton>
      </S.PaginationWrapper>
    </>
  );
};

export default PostList;
