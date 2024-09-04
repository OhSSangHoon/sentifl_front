// 내 블로그- 사이드바

import React from "react";
import * as S from "./Styles/Sidebar.styles";
import {
  FaBell,
  FaCog,
  FaAngleDown,
  FaPen,
  FaCalendarAlt,
  FaParking,
  FaStar,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePenClick = () => {
    navigate("/Create");
  };

  return (
    <S.SidebarContainer>
      {location.pathname === "/myblog" ? (
        <>
          <S.SidebarTopBar>
            <S.LeftIcons>
              <FaParking />
              <S.PointText>0p</S.PointText>
            </S.LeftIcons>
            <S.RightIcons>
              <FaBell />
              <FaCog />
            </S.RightIcons>
          </S.SidebarTopBar>
          <S.Profile>
            <S.ProfileImageWrapper>
              <S.ProfileImage src="path_to_profile_image" alt="Profile" />
            </S.ProfileImageWrapper>
            <S.ProfileInfo>
              <S.PlaylistBadge>My Playlist</S.PlaylistBadge>
              <S.ProfileName>닉네임</S.ProfileName>
              <S.ProfileStats>
                <S.ProfileStatItem>
                  <small>follow</small>
                  <br />
                  <strong>0</strong>
                </S.ProfileStatItem>
                <S.Separator>|</S.Separator>
                <S.ProfileStatItem>
                  <small>following</small>
                  <br />
                  <strong>0</strong>
                </S.ProfileStatItem>
              </S.ProfileStats>
            </S.ProfileInfo>
          </S.Profile>
        </>
      ) : (
        location.pathname === "/blogpost" && (
          <>
            <S.BlogPostProfile>
              <S.ProfileName>닉네임</S.ProfileName>
              <S.PlaylistBadge>My Playlist</S.PlaylistBadge>
              <FaStar />
            </S.BlogPostProfile>
          </>
        )
      )}
      <S.Divider />
      <S.Menu>
        <S.CategoryTitle>
          카테고리 <FaAngleDown />
        </S.CategoryTitle>
        <S.CategoryList>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
        </S.CategoryList>
      </S.Menu>
      <S.Divider />
      <S.PostListContainer>
        <S.PostListHeader>
          글 목록
          <S.Icons>
            <FaPen onClick={handlePenClick} />
            <FaCalendarAlt />
          </S.Icons>
        </S.PostListHeader>
        <S.PostList>
          <S.PostItem>
            <S.PostTitle>제목 1</S.PostTitle>
            <S.PostDate>날짜</S.PostDate>
          </S.PostItem>
          <S.PostItem>
            <S.PostTitle>제목 2</S.PostTitle>
            <S.PostDate>날짜</S.PostDate>
          </S.PostItem>
          <S.PostItem>
            <S.PostTitle>제목 3</S.PostTitle>
            <S.PostDate>날짜</S.PostDate>
          </S.PostItem>
        </S.PostList>
      </S.PostListContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
