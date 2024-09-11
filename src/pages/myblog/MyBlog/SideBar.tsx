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
              <S.ProfileImage src={profileImage || 'path_to_profile_image'} alt="Profile" />
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
