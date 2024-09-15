import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
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

export const TopRightContent = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  color: #aaa;
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
  left: 30px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 20px;
  border-radius: 30px;
  gap: 10px;
`;

export const SongTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
`;

export const CategoryAndTitle = styled.div`
  position: absolute;
  top: 60%;
  left: 20px;
  transform: translateY(-50%);
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
  font-size: 14px;
`;

export const BottomRightContent = styled.div`
  position: absolute;
  bottom: 50px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Date = styled.div`
  color: #aaa;
  font-size: 14px;
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

export const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

export const InputField = styled.input`
  flex: 1;
  background-color: #444;
  border: none;
  padding: 10px;
  margin: 0 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
`;

export const Icon = styled.span`
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
`;
