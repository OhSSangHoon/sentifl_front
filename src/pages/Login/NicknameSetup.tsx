import React from "react";
import { FaStar, FaArrowRight } from "react-icons/fa";
import * as S from "./Styles/NicknameSetup.style";

const NicknameSetup = () => {
  return (
    <S.Container>
      <S.Title>SENTIFL</S.Title>
      <S.ProfileImage />
      <S.Icon>
        <FaStar />
      </S.Icon>
      <S.InputContainer>
        <S.Input type="text" placeholder="닉네임" />
        <S.ArrowIcon>
          <FaArrowRight />
        </S.ArrowIcon>
      </S.InputContainer>
      <S.HintText>• 닉네임은 최소 2글자 이상 작성해주세요.</S.HintText>
    </S.Container>
  );
};

export default NicknameSetup;
