import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SongResult = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Wrapper>
      {loading ? (
        <LoadingScreen>
          <Title>MAKE SENTIFL</Title>
          <LoadingText>
            노래를 생성중입니다. 멋진 음악을 만들어 드릴게요.
          </LoadingText>
        </LoadingScreen>
      ) : (
        <PlayButtonWrapper>
          <PlayButton>▶ 노래 재생하기</PlayButton>
        </PlayButtonWrapper>
      )}
    </Wrapper>
  );
};

export default SongResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: white;
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #ccc;
`;

const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PlayButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #1abc9c;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #16a085;
  }
`;
