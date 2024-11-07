import styled, { keyframes } from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface DotProps {
  isActive: boolean;
}

export const Container = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding-top: 100px;
`;

// export const Background = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

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

export const Circle = styled.div<CircleProps>`
  position: absolute;
  background: ${(props) => props.gradient};
  width: ${(props) => props.size};
  height: calc(${(props) => props.size} / 1.5);
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translateX(${(props) => props.translateX || "0"})
    translateY(${(props) => props.translateY || "0"});
  filter: blur(100px);

  border-radius: 100% 100% 40% 40%;
  overflow: hidden;

  animation: ${pulse} 8s ease-in-out infinite;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 18px;
  color: white;
  margin-top: 40px;
`;

export const S1Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-top: 150px;
  z-index: 100;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const S1Description = styled.p`
  font-size: 32px;
  color: white;
  margin-top: 36px;
  font-weight: bold;
`;

export const S1AdditionalText = styled.p`
  font-size: 14px;
  color: white;
  margin-top: 40px;
`;

export const S2Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const S2Description = styled.p`
  font-size: 18px;
  color: white;
  margin-top: 36px;
  user-select: none;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(100%) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const slideOutLeft = keyframes`
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%) scale(0.9);
    opacity: 0;
  }
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100%) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(100%) scale(0.9);
    opacity: 0;
  }
`;

export const ImageSection = styled.div<{
  isEntering: boolean;
  isEnteringLeft: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 350px;
  user-select: none;
  pointer-events: none;

  animation: ${(props) =>
      props.isEntering
        ? props.isEnteringLeft
          ? slideInLeft
          : slideInRight
        : props.isEnteringLeft
        ? slideOutRight
        : slideOutLeft}
    0.5s ease forwards;
`;

export const ArrowLeft = styled(FaArrowLeft)`
  position: absolute;
  left: 200px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

export const ArrowRight = styled(FaArrowRight)`
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Dot = styled.div<DotProps>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "white" : "gray")};
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
