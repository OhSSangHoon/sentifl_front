import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/NewPost.styles";

interface Post {
  postId: number;
  postUrl: string;
  contents?: string;
  thumbnailUrl: string;
  title: string;
  createdTime: string;
  authorId: string;
}

function NewPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const POSTS_PER_PAGE = 5;
  const MAX_PAGES = 3;
  const MAX_POSTS = POSTS_PER_PAGE * MAX_PAGES;

  const fetchPosts = async () => {
    if (!hasMore || isLoading || posts.length >= MAX_POSTS) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.get("/api/v1/post/recent", {
        params: { size: 15, lastId },
      });

      const postList = response.data.content;

      if (postList.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedPosts = await Promise.all(
        postList.map(async (post: Post) => {
          try {
            const res = await axios.get(post.postUrl);
            const title = res.data.title;
            let contents = res.data.content;

            contents = contents.replace(/<[^>]*>/g, "").trim();

            if(contents.length > 50){
              contents = contents.substring(0, 50) + "...";
            }
            return { ...post, title, contents };
          } catch (error) {
            console.error(`Error fetching title for post ${post.postId}:`, error);
            return { ...post, title: "제목을 불러올 수 없음" };
          }
        })
      );

      setPosts((prev) => [...prev, ...updatedPosts].slice(0, MAX_POSTS));
      setLastId(updatedPosts[updatedPosts.length - 1]?.postId || null);

      if(postList.length < POSTS_PER_PAGE || posts.length >= MAX_POSTS){
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // 현재 페이지의 데이터만 화면에 표시
    const startIndex = currentPage * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setDisplayedPosts(posts.slice(startIndex, endIndex));
  }, [posts, currentPage]);
  

  const handleNext = async () => {
    if (currentPage + 1 >= MAX_PAGES) {
      setCurrentPage(0); // 마지막 페이지에서 첫 페이지로 이동
      return;
    }
  
    const nextPageIndex = currentPage + 1;
    if (nextPageIndex * POSTS_PER_PAGE >= posts.length && hasMore) {
      await fetchPosts(); // 추가 데이터 로드
    }
    setCurrentPage(nextPageIndex);
  };
  
  const handlePrev = () => {
    if (currentPage === 0) {
      const lastPage = MAX_PAGES - 1; // 마지막 페이지 인덱스
      setCurrentPage(lastPage);
      return;
    }
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };


  const handlePostClick = (authorId: string, postId: number) => {
      navigate(`/user/${authorId}/post/${postId}`);
  };

  return (
    <S.Container>
      <S.Title>NEW POST</S.Title>
      <S.HashInt>매일 새로운 이야기를 공유해보세요.</S.HashInt>
      <S.PostList>
        {displayedPosts.map((post) => (
          <S.PostItem key={post.postId} onClick={() => handlePostClick(post.authorId, post.postId)}>
            {post.thumbnailUrl ? (
              <S.thumbnail src={post.thumbnailUrl} />
            ) : null}
            <S.PostTitle>{post.title}</S.PostTitle>
            <S.PostContents>{post.contents}</S.PostContents>
          </S.PostItem>
        ))}
      </S.PostList>
      <S.ButtonContainer>
        <S.LoadMoreButton
          onClick={handlePrev}
        >
          Prev
        </S.LoadMoreButton>
        <S.LoadMoreButton
          onClick={handleNext}
        >
          Next
        </S.LoadMoreButton>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default NewPost;