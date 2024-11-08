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
  z-index: 1000;
`;

export const SearchPopupContainer = styled.div`
  position: relative;
  display: flex;
  width: 60%;
  height: 60vh;
  margin: 0 auto;
  margin-top: 100px;
  z-index: 100;
  justify-content: center;
  background: #c6c6c6;
`;

export const SearchInput = styled.input`
  width: 50%;
  height: 60px;
  padding: 10px 20px;
  margin: 50px 0;
  border-radius: 30px;
  background: #3a3a3c;
  border: none;
  color: #fff;
  outline: none;
  font-size: 1.1em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const CloseButton = styled.button`
  position: fixed;
  background: none;
  border: none;
  font-size: 2em;
  font-weight: 100;
  color: #1c1c1e;
  cursor: pointer;
  right: 21%;
  top: 13%;
`;

export const SearchResults = styled.div`
  position: fixed;
  top: 250px;
  left: 50%;
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 40%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* 최대 높이를 설정하여 스크롤바가 필요할 때만 나타나도록 */
  overflow-y: auto; /* 스크롤이 필요할 때만 스크롤바 표시 */
  z-index: 10;
  border-radius: 5px;
  cursor: pointer;
`;

export const SearchResultItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  justify-content: space-between;

  &:hover {
    background-color: #f0f0f0;
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

export const PostLink = styled(Link)`
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

export const EmotionCircle = styled.div<{ color: string }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${(props) => props.color};
  margin-right: 10px;
  border: 1px solid #fff;
`;
