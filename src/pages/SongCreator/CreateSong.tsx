// Create 노래 제작하려는 글 선택 페이지

import React from "react";
import * as S from "./Styles/CreateSong.style";
import { FaParking } from "react-icons/fa";
import ChoosePost from "./ChoosePost";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const CreateSong = () => {
  const { uid } = useParams<{ uid: string }>();
  const { nickname, profileImage } = useAuth();
  const navigate = useNavigate();

  const handleCreateButtonClick = () => {
    navigate("/Create");
  };

  return (
    <S.Container>
      <S.Sidebar>
        <S.ProfileImage
          src={profileImage || "/default-profile.png"}
          alt="Profile"
        />
        <S.Nickname>{nickname || "userName"}</S.Nickname>
        {/* <S.Points>
          <FaParking style={{ marginRight: "5px" }} /> 0p
        </S.Points> */}
        <S.CreateButton onClick={handleCreateButtonClick}>
          글작성
        </S.CreateButton>
      </S.Sidebar>

      <S.MainContent>
        <ChoosePost />
      </S.MainContent>
    </S.Container>
  );
};

export default CreateSong;
