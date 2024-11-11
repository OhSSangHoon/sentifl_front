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
  right: 100px;
  top: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 340px;
  height: auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
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

  &:hover {
    background-color: #5f5f5f;
  }
  &:active {
    background-color: #5f5f5f;
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

// export const NewPost = styled.div`
//   font-size: 14px;
//   margin-top: 10px;
// `;

// export const PostList = styled.div`
//   margin-top: 10px;
// `;

// export const PostItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 15px;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.3);
//   padding-bottom: 10px;
// `;

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
  max-height: 200px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding:20px 30px;
  margin:25px 0;
  border-radius: 30px;
  background: #3a3a3c;
  border: none;
  color: #fff;
  outline: none;
  font-size: 0.9em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const SearchResults = styled.div`
  position: fixed;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 5px;
  cursor: pointer;
`;

export const SearchResultItem = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  border-radius: 8px;

  span {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
