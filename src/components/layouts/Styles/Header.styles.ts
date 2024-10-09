import { Link, NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";


export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: visible;
`;

export const Logo = styled(RouterNavLink)`
  flex: 1; // 로고는 왼쪽에 배치됨
  img {
    height: 40px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex: 1; // 중앙을 차지하는 공간
  gap: 20px;
`;

export const StyledNavLink = styled(RouterNavLink)`
  color: white;
  font-size: 18px;
  font-weight: thin;
  text-decoration: none;

  &:hover {
    color: #d3d3d3;
  }

  &.active {
    color: #d3d3d3;
  }
`;

export const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 160px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

export const SearchResults = styled.div`
  position: fixed;
  top: 70px;
  right: 3.5%;
  transform: translateX(-50%); /* 가운데 정렬 */
  width: 300px;
  background:#fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* 최대 높이를 설정하여 스크롤바가 필요할 때만 나타나도록 */
  overflow-y: auto; /* 스크롤이 필요할 때만 스크롤바 표시 */
  z-index: 10;
  border-radius: 5px;
  cursor:pointer;
`;


export const SearchResultItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f0f0f0;
  }
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

export const LoginLink = styled(RouterNavLink)`
  text-align: right;
  color: white;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #d3d3d3;
  }

  &.active {
    color: #d3d3d3;
  }
`;

export const ProfileLink = styled.div`
  display: flex;
  justify-content: flex-end;
`;
