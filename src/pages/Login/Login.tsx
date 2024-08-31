import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <LeftPanel>
        <Circle
          size="700px"
          bottom="0"
          left="0"
          translateX="-20%"
          translateY="20%"
          gradient="linear-gradient(135deg, #2B8DBE 0%, rgba(192, 106, 234, 0.52) 100%)"
        />
      </LeftPanel>
      <RightPanel>
        <SignInBox>
          <Title>Sign In</Title>
          <SubTitle>Create your account</SubTitle>
          <Button>
            <img src="path-to-naver-logo" alt="Naver Logo" />
            네이버 아이디로 로그인
          </Button>
          <Button>
            <img src="path-to-google-logo" alt="Google Logo" />
            구글 아이디로 로그인
          </Button>
          <Button>
            <img src="path-to-kakao-logo" alt="Kakao Logo" />
            카카오 아이디로 로그인
          </Button>
          <Footer>*비밀번호를 잊으셨나요?</Footer>
        </SignInBox>
      </RightPanel>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #0d0d0e;
`;

const LeftPanel = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0e0e0e;
  position: relative;
  overflow: hidden;
`;

const RightPanel = styled.div`
  flex: 4;
  background: #0e0e0e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
`;

const Circle = styled.div<{
  size: string;
  bottom?: string;
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
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  transform: translateX(${(props) => props.translateX || "0"})
    translateY(${(props) => props.translateY || "0"});
  filter: blur(100px);
`;

const SignInBox = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: left;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  margin-bottom: 40px;
  color: #aaaaaa;
  font-size: 20px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #444;
  }
`;

const Footer = styled.p`
  margin-top: 140px;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
`;
