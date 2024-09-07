import React, { useEffect, useState } from "react";
import * as S from "./Styles/PostList.styles";
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
            page: 0, // 예시 페이지 번호
            size: 10, // 예시 페이지 사이즈
          },
        });

        const { content } = response.data;
        setPosts(content);
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.Content>
      {posts.map((post) => (
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
              <S.PostDescription>{post.content}</S.PostDescription>
            </S.PostInfo>
            <S.PostImage src="path_to_image" alt="Post Visual" />
          </S.PostContentWrapper>
        </S.Post>
      ))}
    </S.Content>
  );
};

export default PostList;
