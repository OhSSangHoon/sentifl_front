// 메인- 다른 사람 노래 추천

import React from "react";
import styled from "styled-components";
import DotNav from "../../components/DotNav";

function Recommend() {
  return (
    <Container>
      <h1>Welcome to MusicRec</h1>
      <DotNavWrapper>
        <DotNav />
      </DotNavWrapper>
    </Container>
  );
}

export default Recommend;

const Container = styled.div`
  background-color: gray;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;
