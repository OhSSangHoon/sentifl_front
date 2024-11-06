import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAsterisk,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaParking,
  FaPen,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import * as S from "./Styles/Sidebar.styles";

export interface SidebarProps {
  nickname: string;
  uid: string;
  profileImage: string;
  toggleFollowPopup?: () => void;
  toggleFollowingPopup?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleFollowPopup = () => {},
  toggleFollowingPopup = () => {},
}) => {
  const { uid } = useParams<{ uid: string }>();
  const { uid: loggedInUid } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // URL에 따라 SidebarTopBar 다르게 관리
  const isPostUrl = location.pathname.includes("post");
  const isBlogUrl = location.pathname.includes("blog");

  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("/default-profile.png");
  const [followCount, setFollowCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);


  useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const response = await axiosInstance.get(
          `/api/v1/auth/user/search`, {
            params: { keyword: uid, lastId: 0 },
          });
          
          if(response.status === 200 && response.data.length > 0){
            const user = response.data[0];
            setNickname(user.nickName);
            setProfileImage(user.profile || "/default-profile.png");
          }
      } catch (error){
        console.error("Error fetching user info: ", error);
      }
    };

    // 팔로우 및 팔로잉 정보 불러오기
    const fetchFollowInfo = async () => {
      try {
        // 나를 팔로우한 사용자 수 불러오기
        const followedByResponse = await axiosInstance.get(
          `/api/v1/followedby/${uid}`
        );
        const followedByCount = followedByResponse.data.content.length; // content 배열의 길이를 사용해 팔로우 수 계산
        setFollowCount(followedByCount);

        // 내가 팔로우한 사용자 수 불러오기
        const followingResponse = await axiosInstance.get(`/api/v1/follow/${uid}`);
        const followingCount = followingResponse.data.content.length; // content 배열의 길이를 사용해 팔로잉 수 계산
        setFollowingCount(followingCount);
      } catch (error) {
        console.error("팔로우 정보 불러오기에 실패했습니다.", error);
      }
    };
    if(uid){
      fetchUserInfo();
      fetchFollowInfo();
    }
  }, [uid]);

  const handlePenClick = () => {
    if(uid === loggedInUid){
      navigate("/Create");
    }else{
      alert("게시글을 작성할 수 없습니다.");
    }
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
              <strong>{followCount}</strong>
            </S.ProfileStatItem>
            <S.Separator>|</S.Separator>
            <S.ProfileStatItem onClick={toggleFollowingPopup}>
              <small>following</small>
              <strong>{followingCount}</strong>
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
