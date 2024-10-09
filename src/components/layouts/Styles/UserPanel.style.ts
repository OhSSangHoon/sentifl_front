import styled from "styled-components";

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 60px;
  width: 340px;
  height: 430px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 40px 20px;
  color: white;
  overflow: hidden;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    color: #f5f5f5;
  }
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const ProfileInfo = styled.div`
  h2 {
    margin: 10px 0;
    color: white;
  }
  p {
    margin: 5px 0;
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const UserInfo = styled.div`
  flex: 1;
  margin-right: 10px;
`;

export const UserNameAndPlaylist = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`;

export const UserPlaylist = styled.div`
  background-color: grey;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  width: auto;
  cursor: pointer;

  &:hover {
    background-color: #5f5f5f;
  }
  &:active {
    background-color: #5f5f5f;
  }
`;

export const UserStats = styled.div`
  display: flex;
  gap: 20px;
`;

export const FollowStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const StatNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.7);
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
  overflow: hidden;
`;

export const ProfileImageStyled = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  background-size: cover;
  background-position: center;
`;

export const SettingsIcon = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  font-size: 20px;
  padding: 5px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    color: #f5f5f5;
  }
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 12px;
  border-radius: 5px;
`;

export const TabItem = styled.div`
  cursor: pointer;
  padding: 5px 35px;
  color: white;
  font-size: 14px;
  font-weight: normal;
  background-color: transparent;
  border-radius: 5px;

  &:hover {
    font-weight: bold;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 10px;
`;

export const NewPost = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

export const PostList = styled.div`
  margin-top: 10px;
`;

export const PostItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
`;

export const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: grey;
`;

export const PostDetails = styled.div`
  margin-left: 10px;
`;

export const PostName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
`;

export const PostTitle = styled.div`
  font-size: 12px;
  color: grey;
`;

export const LogoutButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
