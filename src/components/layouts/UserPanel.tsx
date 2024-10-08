import React, { useEffect, useState } from "react";
import { FiSettings, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/UserPanel.style";

interface UserPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onClose, onLogout }) => {
  const { nickname, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");

  const [followCount, setFollowCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
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

    fetchFollowInfo();
  }, [uid]);

  const goToMyBlog = () => {
    navigate(`/user/${uid}/blog`);
    onClose();
  };

  const goToPlaylist = () => {
    navigate(`/user/${uid}/playlist`);
    onClose();
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>
          <FiX size={24} />
        </S.CloseButton>
        <S.UserProfile>
          <S.UserInfo>
            <S.UserNameAndPlaylist>
              <S.UserName>{nickname || "닉네임"}</S.UserName>
              <S.UserPlaylist onClick={goToPlaylist}>
                My Playlist
              </S.UserPlaylist>
            </S.UserNameAndPlaylist>
            <S.UserStats>
              <S.FollowStat>
                <S.StatLabel>follow</S.StatLabel>
                <S.StatNumber>{followCount}</S.StatNumber>
              </S.FollowStat>
              <S.FollowStat>
                <S.StatLabel>following</S.StatLabel>
                <S.StatNumber>{followingCount}</S.StatNumber>
              </S.FollowStat>
            </S.UserStats>
          </S.UserInfo>
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={profileImage || "/default-profile.png"}
              alt={nickname}
            />
            <S.SettingsIcon>
              <FiSettings size={24} />
            </S.SettingsIcon>
          </S.ProfileImageContainer>
        </S.UserProfile>
        <S.Tabs>
          <S.TabItem onClick={goToMyBlog}>my blog</S.TabItem>
          <S.Divider />
          <S.TabItem>이웃</S.TabItem>
        </S.Tabs>
        <S.NewPost>new post</S.NewPost>
        <S.PostList>
          <S.PostItem>
            <S.PostAvatar />
            <S.PostDetails>
              <S.PostName>이웃 닉네임</S.PostName>
              <S.PostTitle>포스트 제목</S.PostTitle>
            </S.PostDetails>
          </S.PostItem>
          <S.PostItem>
            <S.PostAvatar />
            <S.PostDetails>
              <S.PostName>이웃 닉네임</S.PostName>
              <S.PostTitle>포스트 제목</S.PostTitle>
            </S.PostDetails>
          </S.PostItem>
        </S.PostList>
        <S.LogoutButton onClick={onLogout}>로그아웃</S.LogoutButton>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default UserPanel;
