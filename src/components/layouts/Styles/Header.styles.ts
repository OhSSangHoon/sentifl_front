// Header.styles.js
import { NavLink as RouterNavLink } from "react-router-dom";
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
`;

export const Logo = styled(RouterNavLink)`
  flex: 1;
  img {
    height: 40px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex: 2;
  justify-content: center;
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
  flex: 2;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 200px;
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
  right: 165px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

export const LoginLink = styled(RouterNavLink)`
  flex: 1;
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
  flex: 1; /* 오른쪽에 위치하게 설정 */
  display: flex;
  justify-content: flex-end;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const ProfileInfo = styled.div`
  h2 {
    margin: 10px 0;
  }
  p {
    margin: 5px 0;
  }
`;
