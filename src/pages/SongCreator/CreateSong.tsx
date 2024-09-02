// Create 노래 제작하려는 글 선택 페이지

import React from "react";
import * as S from "./Styles/CreateSong.style";
import { FaCheck, FaPlay, FaParking } from "react-icons/fa";

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
      <S.MainContent>
        <S.Title>노래로 제작할 블로그 글을 선택해 주세요.</S.Title>
        <S.Subtitle>센티플이 어울리는 음악을 만들어 드릴게요.</S.Subtitle>
        <S.BlogList>
          <S.BlogItem>
            <S.BlogTitle>블로그 제목이 표시됩니다.</S.BlogTitle>
            <S.BlogDate>yyyy.mm.dd</S.BlogDate>
            <S.CheckBox type="checkbox" />
          </S.BlogItem>
          <S.BlogItem>
            <S.BlogTitle>블로그 제목이 표시됩니다.</S.BlogTitle>
            <S.BlogDate>yyyy.mm.dd</S.BlogDate>
            <S.CheckBox type="checkbox" />
          </S.BlogItem>
          <S.BlogItem>
            <S.BlogTitle>블로그 제목이 표시됩니다.</S.BlogTitle>
            <S.BlogDate>yyyy.mm.dd</S.BlogDate>
            <S.CheckBox type="checkbox" />
          </S.BlogItem>
          <S.BlogItem>
            <S.BlogTitle>블로그 제목이 표시됩니다.</S.BlogTitle>
            <S.BlogDate>yyyy.mm.dd</S.BlogDate>
            <S.CheckBox type="checkbox" />
          </S.BlogItem>
          <S.BlogItem>
            <S.BlogTitle>블로그 제목이 표시됩니다.</S.BlogTitle>
            <S.BlogDate>yyyy.mm.dd</S.BlogDate>
            <S.CheckBox type="checkbox" />
          </S.BlogItem>
        </S.BlogList>
      </S.MainContent>
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
