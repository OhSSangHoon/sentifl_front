import React from "react";
import { FaCog } from "react-icons/fa";
import * as S from "./Styles/UserPanel.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

interface UserPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onClose, onLogout }) => {
  const { nickname, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");

  const navigate = useNavigate();

  const goToMyBlog = () => {
    navigate(`/user/${uid}/blog`);
  };

  const goToPlaylist = () => {
    navigate(`/user/${uid}/playlist`);
  };

  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
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
                <S.StatNumber>0</S.StatNumber>
              </S.FollowStat>
              <S.FollowStat>
                <S.StatLabel>following</S.StatLabel>
                <S.StatNumber>0</S.StatNumber>
              </S.FollowStat>
            </S.UserStats>
          </S.UserInfo>
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={profileImage || "/default-profile.png"}
              alt={nickname}
            />
            <S.SettingsIcon>
              <FaCog />
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
        <S.LogoutButton onClick={onLogout}>Log out</S.LogoutButton>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default UserPanel;
