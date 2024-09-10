// Header.style.ts

import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

export interface HeaderProps {
  scrolled: boolean;
}

export const HeaderContainer = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: ${(props) =>
    props.scrolled ? "#000000" : "rgba(0, 0, 0, 0)"};
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
  justify-content: center;
  gap: 50px;
  margin-left: 220px; /* 버튼들을 오른쪽으로 이동 */
  flex-grow: 1; /* 중앙에 배치하기 위해 flex-grow */
`;

export const StyledNavLink = styled(RouterNavLink)`
  color: white;
  font-size: 18px;
  text-decoration: none;
  text-transform: uppercase;
  opacity: 0.6;

  &:hover {
    color: #ffffff;
    opacity: 1;
  }

  &.active {
    color: #ffffff;
    opacity: 1;
    border-bottom: 2px solid white;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1; /* 오른쪽 정렬을 위한 flex-grow */
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
  right: 15px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

export const LoginLink = styled(RouterNavLink)`
  flex-basis: 100px;
  text-align: right;
  color: white;
  font-size: 18px;
  text-decoration: none;
  margin-left: 20px;

  &:hover {
    color: #d3d3d3;
  }

  &.active {
    color: #d3d3d3;
  }
`;

export const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
`;
