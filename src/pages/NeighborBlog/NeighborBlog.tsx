import React from "react";
import styled from "styled-components";
import DotNav from "../../components/DotNav";

const Container = styled.div`
  background-color: gray;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NeighborBlog() {
  return (
    <Container>
      <h1>Welcome to NeighborBlog</h1>
      <DotNavWrapper>
        <DotNav />
      </DotNavWrapper>
    </Container>
  );
}

export default NeighborBlog;

const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;
