import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 120vh;
  background-color: #0e0e0e;
  color: white;
`;

export const TopSection = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #333;
  overflow: hidden;
  margin-top: 80px;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  position: absolute;
  top: 0;
  left: 0;
`;

export const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const TopRightContent = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #aaa;
  font-size: 12px;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const SongTitleWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

export const SongTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  gap: 10px;
`;

export const CategoryAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px;
`;

export const Category = styled.div`
  font-size: 16px;
  color: white;
  margin-bottom: 5px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: white;
  margin: 0;
`;

export const ViewCount = styled.div`
  color: #aaa;
  font-size: 12px;
`;

export const BottomRightContent = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Date = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-right: 10px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: white;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
`;

export const SidebarWrapper = styled.div`
  width: 300px;
  margin-left: 20px;
  margin-right: 40px;
  overflow-y: hidden;
`;

export const PostContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  font-size: 16px;
  line-height: 1.6;
  background: #0e0e0e;
  border-radius: 8px;
  p {
    margin-bottom: 20px;
  }
  overflow-y: auto;
`;
