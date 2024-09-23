import Google from "../../assets/icons/social/google.webp";
import Kakao from "../../assets/icons/social/kakao.webp";
import Naver from "../../assets/icons/social/naver.webp";
import * as S from "./Styles/Login.styles";

function Login() {
  const handleNaverLogin = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`;
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/kakao`;
  };
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
          <S.Button onClick={handleNaverLogin}>
            <img src={Naver} alt="Naver Icon" />
            <span>네이버 아이디로 로그인</span>
          </S.Button>
          <S.Button onClick={handleGoogleLogin}>
            <img src={Google} alt="Google Icon" />
            <span>구글 아이디로 로그인</span>
          </S.Button>
          <S.Button onClick={handleKakaoLogin}>
            <img src={Kakao} alt="Kakao Logo" />
            <span>카카오 아이디로 로그인</span>
          </S.Button>
          <S.Line />
          <S.Footer>*비밀번호를 잊으셨나요?</S.Footer>
        </S.SignInBox>
      </S.RightPanel>
    </S.Container>
  );
}

export default Login;
