import React, { useState, useRef, useEffect } from "react";
import * as S from "./Styles/SongResult.style";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { FaPlay, FaPause } from "react-icons/fa";

const SongResult: React.FC = () => {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const location = useLocation();

  // navigate로 전달된 데이터 받기
  const { title, emotion1, emotion2, musicUrl } = location.state || {};

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicUrl));

  // 노래가 끝났을 때 실행되는 핸들러
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false); // 노래가 끝나면 재생 버튼으로 변경
    };

    // audioRef.current에 ended 이벤트 리스너 추가
    const audio = audioRef.current;
    audio.addEventListener("ended", handleEnded);

    // cleanup 함수에서 이벤트 리스너 제거
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 재생 버튼 클릭 핸들러
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
            <S.ColorText>{emotion2} 설명부분</S.ColorText>
          </S.EmotionTextWrapper>
        </S.ColorInfo>
      </S.TopLeftInfo>

      <S.PlayButtonWrapper>
        <S.PlayButton onClick={handlePlayPause}>
          {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}{" "}
        </S.PlayButton>
      </S.PlayButtonWrapper>

      <S.TitleWrapper>
        <S.MainTitle>{title}</S.MainTitle>
      </S.TitleWrapper>

      <S.BottomLeftButton onClick={() => navigate(`/user/${uid}/playlist`)}>
        MY PLAYLIST
      </S.BottomLeftButton>
    </S.Wrapper>
  );
};

export default SongResult;
