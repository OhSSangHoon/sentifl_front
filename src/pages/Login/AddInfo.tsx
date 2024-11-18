import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/Login.styles";

import Character from "../../assets/characters/Login_character.png";

const AddInfo = () => {
  const [uid, setUid] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState(Character);
  const [step, setStep] = useState(1);
  const [nicknameError, setNicknameError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const userProfile = query.get("profile");


    // 토큰을 로컬스토리지와 쿠키에 저장
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      console.error("액세스 토큰이 없습니다.");
    }

    if (refreshToken) {
      document.cookie = `Authorization-Refresh=${refreshToken}; path=/; samesite=strict`;
    } else {
      console.error("리프레시 토큰이 없습니다.");
    }
  }, [location]);

  const handleAddInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
    } else {
      if (nickname.length < 2) {
        setNicknameError("닉네임은 최소 2글자 이상 작성해주세요.");
        return;
      }


      // uid와 nickname을 백엔드로 전송
      axiosInstance
        .post("/api/v1/auth/add-info", {
          uid,
          nickName: nickname,
          profile,
        })
        .then((response) => {
          alert("추가 정보가 성공적으로 입력되었습니다.");

          const updatedProfile = response.data.profile || "";

          const encodedProfile = encodeURIComponent(updatedProfile);
          const encodedNickname = encodeURIComponent(nickname);

          // 리디렉션을 프론트엔드에서 수행
          window.location.href = `/auth/success?uid=${uid}&nickName=${encodedNickname}&profile=${encodedProfile}`;
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.error(
              "추가 정보 입력 실패:",
              error.response?.data || error
            );
            if (error.response?.status === 409) {
              alert("UID가 이미 존재합니다. 다른 UID를 입력해주세요.");
            } else {
              alert("추가 정보 입력 중 오류가 발생했습니다.");
            }
          } else {
            console.error("예상치 못한 오류:", error);
          }
        });
    }
  };

  return (
    <S.Container>
      <S.Uid>
        <S.infoTitle>Sentifl</S.infoTitle>
        <S.Character src={Character} alt="login character" />
        <form onSubmit={handleAddInfo}>
          <S.AnimatedDiv step={1} activeStep={step}>
            {step === 1 && (
              <S.Form>
                <S.AddInput
                  placeholder="유저 아이디"
                  type="text"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  required
                />
                <S.AddBtn type="submit">→</S.AddBtn>
                <S.Warn>－ 닉네임은 최소 2글자 이상 작성해주세요.</S.Warn>
              </S.Form>
            )}
          </S.AnimatedDiv>
          <S.AnimatedDiv step={2} activeStep={step}>
            {step === 2 && (
              <>
                <S.Form>
                  <S.AddInput
                    placeholder="닉네임"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                  <S.AddBtn type="submit">→</S.AddBtn>
                  <S.Warn>－ 닉네임은 최소 2글자 이상 작성해주세요.</S.Warn>
                </S.Form>
              </>
            )}
          </S.AnimatedDiv>
        </form>
      </S.Uid>
    </S.Container>
  );
};

export default AddInfo;
