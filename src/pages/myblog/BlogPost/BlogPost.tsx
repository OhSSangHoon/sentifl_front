//내 블로그- 작성글

import React from "react";
import Sidebar from "../MyBlog/SideBar";
import * as S from "./Styles/BlogPost.styles";

function BlogPost() {
  return (
    <S.Container>
      <S.TopSection>
        <S.BackgroundImage src="path_to_your_image" alt="Background" />
        <S.Overlay>
          <S.TopRightContent>
            <S.ViewCount>조회수 : 0회</S.ViewCount>
          </S.TopRightContent>
          <S.LeftContent>
            <S.SongTitleWrapper>
              <S.SongTitle>노래제목</S.SongTitle>
            </S.SongTitleWrapper>
            <S.CategoryAndTitle>
              <S.Category>카테고리</S.Category>
              <S.Title>작성한 제목이 표시됩니다.</S.Title>
            </S.CategoryAndTitle>
          </S.LeftContent>
          <S.BottomRightContent>
            <S.Date>2024.08.10</S.Date>
            <S.Actions>
              <S.ActionButton>추가</S.ActionButton>
              <S.ActionButton>수정</S.ActionButton>
              <S.ActionButton>삭제</S.ActionButton>
            </S.Actions>
          </S.BottomRightContent>
        </S.Overlay>
      </S.TopSection>
      <S.MainContent>
        <S.SidebarWrapper>
          <Sidebar />
        </S.SidebarWrapper>
        <S.PostContent>
          <p>작성한 글이 표시됩니다.</p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
        </S.PostContent>
      </S.MainContent>
    </S.Container>
  );
}

export default BlogPost;
