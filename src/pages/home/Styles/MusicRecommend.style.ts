import styled, { css, keyframes } from "styled-components";

interface EmotionButtonProps {
  isSelected: boolean;
  emotion: string;
}

interface EmotionCircleProps {
  color: string;
}

interface PlayIconWrapperProps {
  emotion1: string;
  emotion2: string;
}

interface SongListProps {
  direction: "next" | "prev";
  shouldAnimate: boolean;
}

export const Container = styled.div`
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: white;
  font-size: 55px;
  font-weight: 200;
`;

export const Subtitle = styled.span`
  color: white;
  font-size: 14px;
  margin-top: 10px;
`;

export const EmotionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 40px;
`;

export const EmotionButton = styled.button<EmotionButtonProps>`
  padding: 6px 10px;
  border-radius: 20px;
  background-color: ${({ isSelected, emotion }) =>
    isSelected
      ? {
          행복: "#FFD700",
          사랑: "#FF1493",
          불안: "#6A0DAD",
          분노: "#8B0000",
          우울: "#000080",
          슬픔: "#4169E1",
          중립: "#A9A9A9",
        }[emotion]
      : "#3a3a3c"};
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.1s ease;
`;

export const LoadingMessage = styled.div`
  padding: 10px;
  color: #888;
  margin-top: 50px;
  text-align: center;
  font-size: 1.4em;
`;

export const SongCarousel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 500px;
  overflow: hidden;
  justify-content: center;
  margin-top: 20px;
`;

export const ArrowButton = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  color: ${({ disabled }) => (disabled ? "#555" : "#fff")};
  font-size: 2em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 0 20px;
  &:hover {
    color: ${({ disabled }) => (disabled ? "#555" : "#ddd")};
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

export const SongList = styled.div<SongListProps>`
  display: flex;
  gap: 50px;
  overflow: visible;

  ${({ shouldAnimate, direction }) =>
    shouldAnimate &&
    css`
      animation: ${direction === "next" ? slideInFromRight : slideInFromLeft}
        0.8s forwards;
    `}
`;

export const SongCard = styled.div`
  background-color: transparent;
  padding: 20px;
  width: 300px;
  height: 450px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  border: 2px solid #3a3a3c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

export const EmptySongCard = styled(SongCard)`
  border: 1px dashed #3a3a3c;
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 200% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const PlayIconWrapper = styled.div<PlayIconWrapperProps>`
  width: 160px;
  height: 160px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100%;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ emotion1, emotion2 }) =>
      getEmotionGradient(emotion1, emotion2)};
    background-size: 800% 800%;
    animation: ${gradientAnimation} 10s ease infinite;
    filter: blur(20px);
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const PlayIconCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0.8px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 1.6px rgba(255, 255, 255, 0.2);

  z-index: 1;

  & > svg {
    font-size: 36px;
    color: #fff;
  }
`;

function getEmotionGradient(emotion1: string, emotion2: string) {
  const emotionColors: { [key: string]: string } = {
    행복: "#FFD700",
    사랑: "#FF1493",
    불안: "#6A0DAD",
    분노: "#8B0000",
    우울: "#000080",
    슬픔: "#4169E1",
    중립: "#A9A9A9",
  };

  const color1 = emotionColors[emotion1] || "#A9A9A9";
  const color2 = emotionColors[emotion2] || "#A9A9A9";

  return `linear-gradient(
    270deg,
    ${hexToRgba(color1, 0.5)},
    ${hexToRgba(color2, 0.5)}
  )`;
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const SongTitle = styled.div<{ longText: boolean }>`
  font-size: ${({ longText }) => (longText ? "1em" : "1.6em")};
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
`;

export const UserNickname = styled.div`
  font-size: 0.9em;
  color: #d3d3d3;
`;

export const SaveToPlaylistButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff;
  color: #000;
  cursor: pointer;
  font-size: 0.8em;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const NoSongsMessage = styled.div`
  margin-top: 10px;
  color: #fff;
  font-size: 1em;
`;

export const SongResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const SearchResultItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  width: 80%;
  background-color: #2e2e30;
  margin-bottom: 10px;
  border-radius: 8px;

  &:hover {
    background-color: #3a3a3c;
  }

  span {
    color: #fff;
    font-size: 1em;
    margin-left: 10px;
  }
`;

export const EmotionCircle = styled.div<EmotionCircleProps>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${({ color }) => color};
  border: 1px solid #fff;
`;

export const UserNicknameOld = styled.span`
  margin-left: auto;
  font-size: 0.9em;
  color: #d3d3d3;
`;
