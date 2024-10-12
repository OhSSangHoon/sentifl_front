import React from "react";
import {
  FaAngleDown,
  FaBell,
  FaCog,
  FaParking,
  FaPen,
  FaCalendarAlt,
  FaAsterisk,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  // URL에 따라 SidebarTopBar 다르게 관리
  const isPostUrl = location.pathname.includes("post");
  const isBlogUrl = location.pathname.includes("blog");

  const handlePenClick = () => {
    navigate("/Create");
  };

  const goToPlaylist = () => {
    navigate(`/user/${uid}/playlist`);
  };

  const goToCreateSong = () => {
    navigate("/create-song");
  };

  return (
    <S.SidebarContainer>
      <S.SidebarTopBar>
        {isBlogUrl ? (
          <S.LeftIcons>
            <FaParking size={18} />
            <S.PointText>60p</S.PointText>
          </S.LeftIcons>
        ) : (
          <S.LeftIcons />
        )}
        {isPostUrl ? (
          <S.RightIcons>
            <FaAsterisk size={18} onClick={goToCreateSong} />
          </S.RightIcons>
        ) : (
          <S.RightIcons>
            <FaBell size={18} />
            <FaCog size={18} />
          </S.RightIcons>
        )}
      </S.SidebarTopBar>
      <S.Profile>
        <S.ProfileImageWrapper>
          <S.ProfileImage
            src={profileImage || "/default-profile.png"}
            alt="Profile"
          />
        </S.ProfileImageWrapper>
        <S.ProfileInfo>
          <S.PlaylistBadge onClick={goToPlaylist}>My Playlist</S.PlaylistBadge>
          <S.ProfileName>{nickname}</S.ProfileName>
          <S.ProfileDescription>
            자기 소개글을 작성 할 수 있습니다.
          </S.ProfileDescription>
          <S.ProfileStats>
            <S.ProfileStatItem onClick={toggleFollowPopup}>
              <small>follow</small>
              <strong>0</strong>
            </S.ProfileStatItem>
            <S.Separator>|</S.Separator>
            <S.ProfileStatItem onClick={toggleFollowingPopup}>
              <small>following</small>
              <strong>0</strong>
            </S.ProfileStatItem>
          </S.ProfileStats>
        </S.ProfileInfo>
      </S.Profile>
      <S.Divider />
      <S.Menu>
        <S.CategoryTitle>
          카테고리 <FaAngleDown />
        </S.CategoryTitle>
        <S.Icons>
          <FaPen onClick={handlePenClick} size={18} />
          <FaCalendarAlt size={18} />
        </S.Icons>
        <S.CategoryList>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
        </S.CategoryList>
      </S.Menu>
    </S.SidebarContainer>
  );
};

export default Sidebar;
