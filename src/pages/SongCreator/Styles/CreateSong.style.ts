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
  position: fixed; /* 고정된 위치 */
  top: 100px;
  left: 0;
  height: calc(100vh - 100px);
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
  margin-left: 350px;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
`;

export const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BlogItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 70px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const BlogTitle = styled.span`
  flex-grow: 1;
  font-size: 14px;
  color: #fff;
`;

export const BlogDate = styled.span`
  font-size: 12px;
  color: #ccc;
  margin-right: 10px;
`;

export const CheckBox = styled.input`
  width: 15px;
  height: 15px;
`;

export const PlaySection = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: auto;
  margin-right: 30px;
`;

export const PlayButton = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, #3a3a3a, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #555;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
