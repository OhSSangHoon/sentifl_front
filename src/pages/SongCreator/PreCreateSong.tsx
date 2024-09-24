import React from "react";
import styled from "styled-components";

function PreCreateSong() {
  return (
    <Container>
      <Content>
        <Title>MAKE SENTIFL</Title>
        <Button>나만의 노래를 만들어보세요</Button>
        <Description>
          노래를 만드는 것에 관한 간단한 설명과 소개글이 들어가야 할 것 같습니다
        </Description>
      </Content>
    </Container>
  );
}

export default PreCreateSong;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0d0d0e;
  position: relative;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: white;
`;
