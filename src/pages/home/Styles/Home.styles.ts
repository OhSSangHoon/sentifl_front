import styled, { keyframes } from "styled-components";

interface CircleProps {
  size: string;
  top?: string;
  left?: string;
  translateX?: string;
  translateY?: string;
  gradient: string;
}

// 애니메이션 키프레임 정의
const moveCircle = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
  50% {
    transform: translateX(-45%) translateY(-55%) scale(1.05);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

export const HashtagContainer = styled.div`
  z-index: 1;
`;

export const PageContainer = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Background = styled.div`
  width: 100%;
  // height: auto;
  // min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, #080808, #202020);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div<CircleProps>`
  position: absolute;
  background: ${(props) => props.gradient};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translateX(${(props) => props.translateX || "0"})
    translateY(${(props) => props.translateY || "0"});
  filter: blur(100px);
  animation: ${moveCircle} 8s ease-in-out infinite;
`;
