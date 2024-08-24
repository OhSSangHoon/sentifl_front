import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <img src="/path" alt="logo" />
      </Logo>
      <Nav>
        <StyledNavLink to="/myblog">Create</StyledNavLink>
        <StyledNavLink to="/">Home</StyledNavLink>
      </Nav>
      <SearchContainer>
        <SearchInput placeholder="Search..." />
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
      </SearchContainer>
      <LoginLink>Log in</LoginLink>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: transparent; /* 헤더 배경 투명 */
`;

const Logo = styled.div`
  flex: 1;
  img {
    height: 40px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 2;
  justify-content: center;
  gap: 20px;
`;

const StyledNavLink = styled(RouterNavLink)`
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

const SearchContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SearchInput = styled.input`
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

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 165px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const LoginLink = styled.a`
  flex: 1;
  text-align: right;
  color: white;
  font-size: 18px;
  text-decoration: none;
`;
