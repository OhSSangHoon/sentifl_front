import React from "react";
import { FaSearch } from "react-icons/fa";
import * as S from "./Styles/Header.styles";

function Header() {
  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <img src="/path" alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/createSong">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
        <S.StyledNavLink to="/myblog">블로그(임시)</S.StyledNavLink>
      </S.Nav>
      <S.SearchContainer>
        <S.SearchInput placeholder="Search..." />
        <S.SearchIcon>
          <FaSearch />
        </S.SearchIcon>
      </S.SearchContainer>
      <S.LoginLink to="/login">Log in</S.LoginLink>
    </S.HeaderContainer>
  );
}

export default Header;
