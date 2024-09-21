// Sidebar.tsx
import React from "react";
import {
  FaAngleDown,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaParking,
  FaPen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles/Sidebar.styles";

export interface SidebarProps {
  nickname: string;
  uid: string;
  profileImage: string;
  toggleFollowPopup?: () => void;
  toggleFollowingPopup?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  nickname,
  uid,
  profileImage,
  toggleFollowPopup = () => {},
  toggleFollowingPopup = () => {},
}) => {
  const navigate = useNavigate();

  const handlePenClick = () => {
    navigate("/Create");
  };

  const goToPlaylist = () => {
    navigate(`/user/${uid}/playlist`);
  };

  return (
    <S.SidebarContainer>
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
            <S.ProfileImage
              src={profileImage || "/default-profile.png"}
              alt="Profile"
            />
          </S.ProfileImageWrapper>
          <S.ProfileInfo>
            <S.PlaylistBadge onClick={goToPlaylist}>
              My Playlist
            </S.PlaylistBadge>
            <S.ProfileName>{nickname}</S.ProfileName>
            <S.ProfileStats>
              <S.ProfileStatItem onClick={toggleFollowPopup}>
                <small>follow</small>
                <br />
                <strong>0</strong>
              </S.ProfileStatItem>
              <S.Separator>|</S.Separator>
              <S.ProfileStatItem onClick={toggleFollowingPopup}>
                <small>following</small>
                <br />
                <strong>0</strong>
              </S.ProfileStatItem>
            </S.ProfileStats>
          </S.ProfileInfo>
        </S.Profile>
      </>
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
      <S.Icons>
        <FaPen onClick={handlePenClick} />
        <FaCalendarAlt />
      </S.Icons>
    </S.SidebarContainer>
  );
};

export default Sidebar;
