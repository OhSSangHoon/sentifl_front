// 내 블로그- 사이드바
import {
  FaAngleDown,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaParking,
  FaPen,
  FaStar,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import * as S from "./Styles/Sidebar.styles";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, uid, profileImage } = useAuth();

  const handlePenClick = () => {
    navigate("/Create");
  };

  const goToPlaylist = () => {
    navigate("/playlist");
  };

  // 내 블로그 페이지의 사이드바와 블로그 특정글 페이지의 사이드바를 location.pathname을 통해 어떤걸 보여줄지 정함
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
              src={profileImage || "path_to_profile_image"}
              alt="Profile"
            />
          </S.ProfileImageWrapper>
          <S.ProfileInfo>
            <S.PlaylistBadge>My Playlist</S.PlaylistBadge>
            <S.ProfileName>{nickname}</S.ProfileName>
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
