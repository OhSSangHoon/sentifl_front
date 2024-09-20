// 노래 결과 페이지

import React from "react";
import * as S from "./Styles/SongResult.style";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const SongResult: React.FC = () => {
  const navigate = useNavigate();
  const { uid } = useParams<{ uid: string }>();
  const location = useLocation();

  // navigate로 전달된 데이터 받기
  const { title, emotion1, emotion2, musicUrl } = location.state || {};

  const handlePlay = () => {
    const audio = new Audio(musicUrl);
    audio.play();
  };

  return (
    <S.Wrapper>
      <S.TopLeftInfo>
        <S.InfoText>하루동안 느낀 당신의 감정이에요.</S.InfoText>
        <S.ColorInfo>
          <S.ColorBox color="#0000FF" />
          <S.EmotionTextWrapper>
            <S.ColorText>{emotion1}</S.ColorText>
            <S.ColorText>{emotion1} 설명부분</S.ColorText>
          </S.EmotionTextWrapper>
        </S.ColorInfo>
        <S.ColorInfo>
          <S.ColorBox color="#00FFFF" />
          <S.EmotionTextWrapper>
            <S.ColorText>{emotion2}</S.ColorText>
            <S.ColorText>{emotion2}설명부분</S.ColorText>
          </S.EmotionTextWrapper>
        </S.ColorInfo>
      </S.TopLeftInfo>

      <S.PlayButtonWrapper>
        <S.PlayButton onClick={handlePlay}>
          <FiPlay size={40} />
        </S.PlayButton>
      </S.PlayButtonWrapper>

      <S.TitleWrapper>
        <S.MainTitle>{title}</S.MainTitle>
      </S.TitleWrapper>

      <S.BottomLeftButton onClick={() => navigate(`/user/${uid}/playlist`)}>
        MY PLAYLIST
      </S.BottomLeftButton>

      <S.BottomRightText onClick={() => navigate(`/user/${uid}/blog`)}>
        My blog <FiArrowRight />
      </S.BottomRightText>
    </S.Wrapper>
  );
};

export default SongResult;
