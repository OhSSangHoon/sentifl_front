// 메인 홈

import React from "react";
import DotNav from "../../components/DotNav";
import * as S from "./Styles/Home.styles";
import { Link } from "react-router-dom";

function Home() {
  return (
    <S.Background>
      <S.CircleContainer>
        <S.Circle
          size="800px"
          top="70%"
          left="35%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #F12FBB 0%, #B2EA6A 100%)"
        />
        <S.Circle
          size="800px"
          top="50%"
          left="80%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #2B8DBE 0%, #C06AEA 100%)"
        />
      </S.CircleContainer>
      <S.DotNavWrapper>
        <DotNav />
      </S.DotNavWrapper>
    </S.Background>
  );
}

export default Home;
