import React from "react";
import styled, { keyframes } from "styled-components";

function Home() {
  return (
    <Background>
      <RotatingContainer>
        <Circle
          color="rgba(255, 0, 0, 0.2)"
          size="800px"
          top="0"
          left="50%"
          translateX="-50%"
        />
        <Circle
          color="rgba(0, 255, 0, 0.2)"
          size="800px"
          top="50%"
          left="25%"
          translateX="-50%"
          translateY="-50%"
        />
        <Circle
          color="rgba(0, 0, 255, 0.2)"
          size="800px"
          top="50%"
          left="75%"
          translateX="-50%"
          translateY="-50%"
        />
      </RotatingContainer>
    </Background>
  );
}

export default Home;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #080808, #202020);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 120s infinite linear;
`;

const Circle = styled.div<{
  color: string;
  size: string;
  top?: string;
  left?: string;
  translateX?: string;
  translateY?: string;
}>`
  position: absolute;
  background-color: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translateX(${(props) => props.translateX || "0"})
    translateY(${(props) => props.translateY || "0"});
  filter: blur(100px);
`;
