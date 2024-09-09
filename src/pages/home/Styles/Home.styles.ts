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

export const Background = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #080808, #202020);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CircleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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

export const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;

export const TopLeftLink = styled.div`
  position: absolute;
  top: 200px;
  left: 20px;

  a {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
  }
`;
