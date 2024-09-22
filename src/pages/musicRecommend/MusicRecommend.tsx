// 메인- 다른 사람 노래 추천

import React from "react";
import styled from "styled-components";
import DotNav from "../../components/DotNav";

function MusicRecommend() {
  return (
    <Container>
      <h1 style={{ color: "white" }}>노래 추천</h1>
      <DotNavWrapper>
        <DotNav />
      </DotNavWrapper>
    </Container>
  );
}

export default MusicRecommend;

const Container = styled.div`
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;
