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
  right: 160px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
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
