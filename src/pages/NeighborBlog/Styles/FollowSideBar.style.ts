import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  padding: 20px;
  align-items: center;
`;

export const FollowButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 75px;
  height: 30px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

export const MainGroup = styled.div`
  display: flex;
  margin-left: 20px;
  flex-grow: 1;
  align-items: flex-end;
`;

export const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
`;

export const PlaylistButton = styled.button`
  width: 60px;
  height: 15px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const Nickname = styled.div`
  align-self: flex-end;
  font-size: 18px;
  color: #fff;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #aaa;
`;

export const StatCount = styled.div`
  font-size: 16px;
  color: #fff;
`;

export const Separator = styled.div`
  margin: 0 10px;
  font-size: 18px;
  color: #aaa;
`;
