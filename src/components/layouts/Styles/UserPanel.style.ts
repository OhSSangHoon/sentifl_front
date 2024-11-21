import { Link } from "react-router-dom";
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
  display: flex;
  flex-direction: column;
  right: 100px;
  top: 100px;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  max-height: 80vh; /* 화면의 최대 높이 제한 */
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
  color: white;
  overflow-y: auto; /* 내부 콘텐츠가 넘칠 경우 스크롤 활성화 */
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.1s ease;

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
  margin-right: 60px;
`;

export const UserNameAndPlaylist = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  background-color: #5f5f5f;
  color: white;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
  width: 80px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #4a4a4a;
  }

  &:active {
    background-color: #4a4a4a;
    transform: scale(0.95);
  }
`;

export const UserStats = styled.div`
  display: flex;
  gap: 35px;
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
  margin-top: 50px;
  margin-left: auto;
  bottom: 20px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  padding: 5px 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 17px 50px;
  margin: 5px 0;
  border-radius: 5px;
  background: #000;
  border: none;
  color: #fff;
  outline: none;
  font-size: 0.9em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const SearchResults = styled.div`
  width: 100%;
  background: #111;
  max-height: 50vh;
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 15px 10px;
  display: flex;
  position: relative;
  background: #fff;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #D9D9D9;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #D9D9D9;
  }

  span {
    margin-left: 20px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;

  }
`;


export const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;

  img {
    margin-right: 10px;
  }

  span {
    font-size: 14px;
  }
`;

export const FollowButton = styled.button<{ isFollowing: boolean }>`
  position: absolute;
  right: 10px;
  background-color: ${(props) => (props.isFollowing ? "#cccccc" : "#007bff")};
  color: ${(props) => (props.isFollowing ? "#666666" : "white")};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${(props) => (props.isFollowing ? 0.6 : 1)};
`;

export const Settings = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  cursor: pointer;
`;

// UserProfile
