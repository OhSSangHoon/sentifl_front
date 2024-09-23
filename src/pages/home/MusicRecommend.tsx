// 메인- 다른 사람 노래 추천

import React from "react";
import styled from "styled-components";

function MusicRecommend() {
  return (
    <Container>
      <h1 style={{ color: "white" }}>노래 추천</h1>
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
