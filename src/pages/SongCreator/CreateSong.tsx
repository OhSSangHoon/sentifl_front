// Create 노래 제작하려는 글 선택 페이지

import React from "react";
import * as S from "./Styles/CreateSong.style";
import { FaCheck, FaPlay, FaParking } from "react-icons/fa";
import PostList from "./PostList";
import { PostListWrapper } from "../myblog/MyBlog/Styles/MyBlog.style";

const CreateSong = () => {
  return (
    <S.Container>
      <S.Sidebar>
        <S.ProfileImage src="https://your-image-url.com" alt="Profile" />
        <S.Nickname>닉네임</S.Nickname>
        <S.Points>
          <FaParking style={{ marginRight: "5px" }} /> 0p
        </S.Points>
      </S.Sidebar>
      <PostListWrapper>
        <PostList />
      </PostListWrapper>
      <S.PlaySection>
        <S.PlayButton>
          <FaPlay />
        </S.PlayButton>
        <S.CreateButton>노래 제작</S.CreateButton>
      </S.PlaySection>
    </S.Container>
  );
};

export default CreateSong;
