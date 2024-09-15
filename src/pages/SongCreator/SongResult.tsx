import React from "react";
import * as S from "./Styles/SongResult.style";

const SongResult = () => {
  return (
    <S.Wrapper>
      <S.TopLeftInfo>
        <S.InfoText>휴식동안 느낀 당신의 감정이에요.</S.InfoText>
        <S.ColorInfo>
          <S.ColorBox color="#0000FF" />
          <S.ColorText>슬픔: 영화 그리운 사람 만남의 회상</S.ColorText>
        </S.ColorInfo>
        <S.ColorInfo>
          <S.ColorBox color="#00FFFF" />
          <S.ColorText>편안: 조용하면서도 상쾌한 바람</S.ColorText>
        </S.ColorInfo>
      </S.TopLeftInfo>

      <S.PlayButtonWrapper>
        <S.PlayButton>▶</S.PlayButton>
      </S.PlayButtonWrapper>

      <S.TitleWrapper>
        <S.MainTitle>제목이 들어가는 곳</S.MainTitle>
      </S.TitleWrapper>

      <S.BottomLeftButton>MY PLAYLIST</S.BottomLeftButton>

      <S.BottomRightText>My blog</S.BottomRightText>
    </S.Wrapper>
  );
};

export default SongResult;
