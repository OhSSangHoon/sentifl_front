//내 블로그- 작성글 확인

import React from "react";
import Sidebar from "../MyBlog/SideBar";
import * as S from "./Styles/BlogPost.styles";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaPlay, FaWaveSquare } from "react-icons/fa";

function BlogPost() {
  const { postId } = useParams();

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/Create");
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.BackgroundImage src="path_to_your_image" alt="Background" />

        <S.TopRightContent>
          <S.ViewCount>조회수 : 0회</S.ViewCount>
        </S.TopRightContent>
        <S.LeftContent>
          <S.SongTitleWrapper>
            <S.SongTitle>노래제목</S.SongTitle> <FaPlay />
            <FaWaveSquare />
          </S.SongTitleWrapper>
          <S.CategoryAndTitle>
            <S.Category>카테고리</S.Category>
            <S.Title>작성한 제목이 표시됩니다.</S.Title>
          </S.CategoryAndTitle>
        </S.LeftContent>
        <S.BottomRightContent>
          <S.Date>2024.08.10</S.Date>
          <S.Actions>
            <S.ActionButton onClick={handleAddClick}>추가</S.ActionButton>
            <S.ActionButton>수정</S.ActionButton>
            <S.ActionButton>삭제</S.ActionButton>
          </S.Actions>
        </S.BottomRightContent>
      </S.TopSection>
      <S.MainContent>
        {/* <S.SidebarWrapper><Sidebar /></S.SidebarWrapper> */}
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
      <S.FixedBottomBar>
        <S.Icon>❤</S.Icon>
        <S.Icon>💬</S.Icon>
        <S.InputField type="text" placeholder="댓글을 입력하세요" />
        <S.Icon>
          <FaPaperPlane />
        </S.Icon>
      </S.FixedBottomBar>
    </S.Container>
  );
}

export default BlogPost;
