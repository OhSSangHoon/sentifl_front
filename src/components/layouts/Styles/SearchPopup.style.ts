import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";

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
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 70vh;
  margin: 0 auto;
  margin-top: 100px;
  z-index: 100;
  background: transparent;
  backdrop-filter: blur(200px);
  border-radius: 8px;
  padding: 20px;
`;

export const SearchResultsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  background: #1c1c1e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 40px;
`;

export const PostResultsContainer = styled.div`
  width: 50%;
  padding-right: 10px;
  border-right: 1px solid #cccccc;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  h3 {
    font-size: 0.9em;
    margin-bottom: 10px;
    color: #888;
  }
`;

export const SongResultsContainer = styled.div`
  width: 50%;
  padding-left: 10px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  h3 {
    font-size: 0.9em;
    margin-bottom: 10px;
    color: #888;
  }
`;

export const NoResults = styled.div`
  padding: 10px;
  color: #888;
  text-align: center;
  font-size: 0.9em;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 100px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px 20px 10px 50px;
  margin: 50px 0;
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

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 75px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2em;
  transition: color 0.1s;

  &:hover {
    color: #ffffff;
  }
`;

export const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5em;
  color: #888888;
  cursor: pointer;

  transition: color 0.1s;

  &:hover {
    color: #444444;
  }

  &:active {
    color: #444444;
  }
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
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s;
  border-radius: 8px;

  &:hover {
    background-color: #2e2e30;
  }

  &:active {
    background-color: #3a3a3c;
  }

  span {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
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

export const UserNickname = styled.span`
  margin-left: auto;
  font-size: 14px;
  color: #d3d3d3;
  padding-left: 10px;
`;

export const EmotionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 8px;
  width: 100%;
`;

export const EmotionButton = styled.button<{ isSelected: boolean }>`
  padding: 6px 10px;
  border-radius: 20px;
  background-color: ${({ isSelected }) => (isSelected ? "#FF1493" : "#3a3a3c")};
  color: #888;
  border: none;
  cursor: pointer;
  font-size: 0.7em;
  overflow: hidden;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #d3d3d3;
  }
`;

export const FilterSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const FilterSelect = styled.select`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.6em;
  background-color: #3a3a3c;
  color: #fff;

  border-radius: 5px;
  padding: 5px;
  outline: none;

  &:hover {
    background-color: #2e2e30;
  }
`;

export const LoadingMessage = styled.div`
  padding: 10px;
  color: #888;
  text-align: center;
  font-size: 0.9em;
`;
