import React, { useEffect, useState } from "react";
import * as S from "./Styles/PostList.style";
import axios from "axios";

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
  const pageSize = 10; // 페이지당 게시물 수

  useEffect(() => {
    // 로컬 스토리지에서 uid 값 가져오기
    const uid = localStorage.getItem("uid");

    if (!uid) {
      console.log("uid가 로컬 스토리지에 없습니다.");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/v1/post/${uid}`, {
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

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <S.MainContent>
        <S.Title>노래로 제작할 블로그 글을 선택해 주세요.</S.Title>
        <S.Subtitle>센티플이 어울리는 음악을 만들어 드릴게요.</S.Subtitle>
        <S.BlogList>
          {posts.map((post) => (
            <S.BlogItem key={post.postId}>
              <S.BlogTitle>{post.title}</S.BlogTitle>
              <S.BlogDate>
                {new Date(post.time).toLocaleDateString()}
              </S.BlogDate>
              <S.CheckBox type="checkbox" />
            </S.BlogItem>
          ))}
        </S.BlogList>
      </S.MainContent>

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
