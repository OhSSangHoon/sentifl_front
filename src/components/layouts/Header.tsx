import { FaSearch } from "react-icons/fa";
import * as S from "./Styles/Header.styles";

function Header() {

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <img src="/path" alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/myblog">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
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
