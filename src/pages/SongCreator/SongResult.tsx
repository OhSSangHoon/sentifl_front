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
        <EmotionDescription emotion={emotion1} />
        <EmotionDescription emotion={emotion2} />
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

const emotionColors: { [key: string]: string } = {
  분노: "#FF0000",
  불안: "#FFA500",
  사랑: "#FF69B4",
  슬픔: "#1E90FF",
  우울: "#2F4F4F",
  중립: "#808080",
  행복: "#FFFF00",
};

const emotionDescriptions: { [key: string]: string } = {
  분노: "화가 날 땐 잠시 멈추고 깊게 숨을 쉬며 마음을 가라앉히는 게 좋습니다.",
  불안: "걱정될 때는 한 번에 모든 걸 해결하려 하지 말고 작은 것부터 차근차근 해보세요.",
  사랑: "사랑은 상대를 이해하고 배려하는 마음에서 더욱 깊어집니다.",
  슬픔: "슬플 때는 억지로 감정을 숨기지 말고 충분히 느끼고 받아들이는 것이 중요합니다.",
  우울: "우울할 때는 혼자 고민하지 말고 가까운 사람에게 마음을 털어놓는 것이 도움이 됩니다.",
  중립: "감정이 없다고 느껴질 때는 자신을 돌아보고 차분히 시간을 보내는 것도 좋습니다.",
  행복: "행복한 순간을 소중히 여기고, 그 기쁨을 오래 간직하는 마음이 중요합니다.",
};

const EmotionDescription: React.FC<{ emotion: string }> = ({ emotion }) => (
  <S.ColorInfo>
    <S.ColorBox color={emotionColors[emotion]} />
    <S.EmotionTextWrapper>
      <S.ColorText>{emotion}</S.ColorText>
      <S.ColorText>{emotionDescriptions[emotion]}</S.ColorText>
    </S.EmotionTextWrapper>
  </S.ColorInfo>
);
