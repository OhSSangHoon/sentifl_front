import React, { useState, useEffect } from "react";
import * as S from "./Styles/Header.styles";
import { FaUser, FaSearch } from "react-icons/fa";

interface HeaderProps {
  toggleUserPanel: () => void;
  isUserPanelVisible: boolean;
}

function Header({ toggleUserPanel, isUserPanelVisible }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <S.HeaderContainer scrolled={scrolled}>
        <S.Logo to="/">
          <img src="/path" alt="logo" />
        </S.Logo>
        <S.Nav>
          <S.StyledNavLink to="/createsong">Create</S.StyledNavLink>
          <S.StyledNavLink to="/">Home</S.StyledNavLink>
        </S.Nav>
        <S.SearchContainer>
          <S.SearchInput placeholder="Search..." />
          <S.SearchIcon>
            <FaSearch size={18} />
          </S.SearchIcon>
        </S.SearchContainer>
        {/* 로그인 시 보이는 요소 */}
        <S.IconContainer onClick={toggleUserPanel}>
          <FaUser size={24} />
        </S.IconContainer>
        <S.LoginLink to="/login">Log in</S.LoginLink>
      </S.HeaderContainer>
    </>
  );
}

export default Header;
