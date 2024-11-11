import styled, { keyframes } from "styled-components";

interface CircleProps {
  size: string;
  top?: string;
  left?: string;
  translateX?: string;
  translateY?: string;
  gradient: string;
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
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
  height: auto;
  min-height: 100vh;
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
  animation: ${pulse} 6s ease-in-out infinite;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 10%;
  z-index: 2;
`;

export const MainText = styled.h2`
  color: #ffffff;
  font-size: 28px;
  font-weight: 250;
  margin-bottom: 30px;
`;

export const SubText = styled.span`
  color: #999999;
  font-size: 18px;
`;
