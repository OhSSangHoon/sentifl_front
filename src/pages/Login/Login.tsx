import React from "react";
import * as S from "./Styles/Login.styles";

function Login() {
  return (
    <S.Container>
      <S.LeftPanel>
        <S.Circle
          size="700px"
          bottom="0"
          left="0"
          translateX="-20%"
          translateY="20%"
          gradient="linear-gradient(135deg, #2B8DBE 0%, rgba(192, 106, 234, 0.52) 100%)"
        />
      </S.LeftPanel>
      <S.RightPanel>
        <S.SignInBox>
          <S.Title>Sign In</S.Title>
          <S.SubTitle>Create your account</S.SubTitle>
          <S.Button>
            <img src="path-to-naver-logo" alt="Naver Logo" />
            네이버 아이디로 로그인
          </S.Button>
          <S.Button>
            <img src="path-to-google-logo" alt="Google Logo" />
            구글 아이디로 로그인
          </S.Button>
          <S.Button>
            <img src="path-to-kakao-logo" alt="Kakao Logo" />
            카카오 아이디로 로그인
          </S.Button>
          <S.Footer>*비밀번호를 잊으셨나요?</S.Footer>
        </S.SignInBox>
      </S.RightPanel>
    </S.Container>
  );
}

export default Login;
