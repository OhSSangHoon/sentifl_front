import styled from "styled-components";

export const MypageContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 60px;
  width: 300px;
  height: 400px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 40px 20px;
  color: white;
  overflow: hidden;
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
  margin-bottom: 15px;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const UserPlaylist = styled.div`
  background-color: grey;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 12px;
`;

export const UserStats = styled.div`
  display: flex;
  gap: 20px;
`;

export const FollowStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
  overflow: hidden;
`;

export const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  background-size: cover;
  background-position: center;
`;

export const SettingsIcon = styled.div`
  position: absolute;
  bottom: -10px;
  right: -5px;
  font-size: 25px;
  padding: 5px;
  border-radius: 50%;
  color: gray;
  cursor: pointer;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.39);
  padding: 5px;
  border-radius: 5px;
`;

export const TabItem = styled.div`
  cursor: pointer;
  padding: 5px 35px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: normal;
  background-color: transparent;
  border-radius: 5px;
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
  margin-bottom: 10px;
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
`;

export const PostTitle = styled.div`
  font-size: 12px;
  color: grey;
`;
