import React, { useEffect, useState } from "react";
import * as S from "./Styles/FollowSideBar.style";
import axiosInstance from "../../axiosInterceptor";
import { useAuth } from "../../AuthProvider";

function FollowSideBar() {
  return (
    <S.Container>
      <S.FollowButton>팔로우</S.FollowButton>
      <S.ProfileImage src={"/default-profile.png"} alt="Profile" />
      <S.MainGroup>
        <S.LeftGroup>
          <S.PlaylistButton>Playlist</S.PlaylistButton>
          <S.Nickname>닉네임</S.Nickname>
        </S.LeftGroup>
        <S.RightGroup>
          <S.StatItem>
            <S.StatLabel>Follow</S.StatLabel>
            <S.StatCount>0</S.StatCount>
          </S.StatItem>
          <S.Separator>|</S.Separator>
          <S.StatItem>
            <S.StatLabel>Following</S.StatLabel>
            <S.StatCount>0</S.StatCount>
          </S.StatItem>
        </S.RightGroup>
      </S.MainGroup>
    </S.Container>
  );
}

export default FollowSideBar;
