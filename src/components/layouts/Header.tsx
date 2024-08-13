import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <img src="/path" alt="logo" />
      </Logo>
      <Nav>
        <NavLink>Create</NavLink>
        <NavLink>Home</NavLink>
      </Nav>
      <SearchContainer>
        <SearchInput placeholder="Search..." />
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
  background: transparent;
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

const NavLink = styled.a`
  color: white;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }
`;

const SearchContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
`;

const LoginLink = styled.a`
  flex: 1;
  text-align: right;
  color: white;
  font-size: 18px;
  text-decoration: none;
`;
