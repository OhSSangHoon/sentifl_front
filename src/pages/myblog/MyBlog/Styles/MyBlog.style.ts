import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background: #0d0d0e;
  color: #ffffff;
  height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PostListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 70px);
  padding-right: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const Popup = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  width: 300px;
  height: 500px;
  background: #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  position: relative;
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px; /* 위쪽 패딩을 아래로 내리기 */
  border-bottom: 1px solid #444;
  margin-top: 20px; /* 헤더를 아래로 내리기 */
`;

export const Tab = styled.div<{ active: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#ffffff" : "rgba(255, 255, 255, 0.5)")};
  cursor: pointer;
`;

export const PopupContent = styled.div`
  padding: 20px;
  color: #fff;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px; /* 버튼을 더 위로 */
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export const FollowItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const FollowProfile = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  position: relative;
`;

export const Nickname = styled.span`
  margin-left: 10px;
  font-size: 18px;
  color: #fff;
`;
