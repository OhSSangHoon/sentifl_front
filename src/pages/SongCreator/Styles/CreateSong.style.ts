import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: auto;
  min-height: 100vh;
  background-color: #0d0d0e;
  color: #fff;
  margin-top: 100px;
`;

export const Sidebar = styled.div`
  width: 300px;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-left: 30px;
  position: fixed;
  top: 100px;
  left: 0;
  height: calc(100vh - 100px);
  z-index: 1000;
`;

export const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: white;
`;

export const Nickname = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Points = styled.p`
  font-size: 14px;
  color: #ccc;
  display: flex;
  align-items: center;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 350px;
  flex-grow: 1;
  padding: 20px;
  align-items: flex-start;
  gap: 40px;
`;

export const PostListWrapper = styled.div`
  flex-grow: 2;
  max-width: 800px;
  padding: 20px;
  background-color: #1c1c1c;
  border-radius: 8px;
`;

export const PlaySection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
