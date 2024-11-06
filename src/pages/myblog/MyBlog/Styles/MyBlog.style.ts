import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #0d0d0e;
  color: #ffffff;
  height: auto;
  min-height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

// export const SidebarWrapper = styled.div`
//   width: 100%;
//   background: #1e1e1e;
//   padding: 20px;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 20px;
// `;

export const SidebarWrapper = styled.div<{ isOwner: boolean }>`
  width: ${(props) => (props.isOwner ? "25%" : "100%")};
  margin-bottom: ${(props) => (props.isOwner ? "0" : "20px")};
  margin-right: ${(props) => (props.isOwner ? "20px" : "0")};
  background: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostListWrapper = styled.div<{ isOwner: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: ${(props) => (props.isOwner ? "80%" : "100%")};
  ::-webkit-scrollbar {
    display: none;
  }
`;

// export const PostListWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   flex-grow: 1;
//   width: 100%;

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `;

export const MainContent = styled.div<{ isOwner: boolean }>`
  display: flex;
  flex-direction: ${({ isOwner }) => (isOwner ? "row" : "column")};
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 80px;
  max-width: 100%;
`;

// export const MainContent = styled.div`
//   display: flex;
//   flex-grow: 1;
//   overflow-y: auto;
//   padding-bottom: 80px;
//   max-width: 100%;
// `;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const Popup = styled.div`
  position: fixed;
  right: 220px;
  top: 0;
  width: 300px;
  height: 500px;
  background: rgba(119, 119, 119, 0.8);
  border-bottom-right-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  position: relative;
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
  margin-top: 20px;
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
  top: 5px;
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

  span {
    margin-left: 10px;
  }
`;

export const FollowingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }
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
