// 메인 홈

import styled from "styled-components";
import DotNav from "../../components/DotNav";

function Home() {
  return (
    <Background>
      <CircleContainer>
        <Circle
          size="800px"
          top="70%"
          left="35%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #F12FBB 0%, #B2EA6A 100%)"
        />
        <Circle
          size="800px"
          top="50%"
          left="80%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #2B8DBE 0%, #C06AEA 100%)"
        />
      </CircleContainer>
      <DotNavWrapper>
        <DotNav />
      </DotNavWrapper>
    </Background>
  );
}

export default Home;

const Background = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #080808, #202020);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div<{
  size: string;
  top?: string;
  left?: string;
  translateX?: string;
  translateY?: string;
  gradient: string;
}>`
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
`;

const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;
