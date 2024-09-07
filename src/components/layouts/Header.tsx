// Header
import React, { useState, useEffect } from "react";
import * as S from "./Styles/Header.styles";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.HeaderContainer scrolled={scrolled}>
      <S.Logo to="/">
        <img src="/path" alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/create">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
      </S.Nav>
      <S.SearchContainer>
        <S.SearchInput placeholder="Search..." />
        <S.SearchIcon />
      </S.SearchContainer>
      <S.LoginLink to="/login">Log in</S.LoginLink>
    </S.HeaderContainer>
  );
}

export default Header;
