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

export const SearchBtn = styled.button`

`;

// export const SearchIcon = styled.div`
//   position: absolute;
//   top: 50%;
//   right: 160px;
//   transform: translateY(-50%);
//   color: rgba(255, 255, 255, 0.7);
// `;




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