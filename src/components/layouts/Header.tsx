import { useState } from "react";
import MainLogo from "../../assets/logos/logo.png";
import { useAuth } from "../../AuthProvider";
import SearchPopup from "./SearchPopup";
import * as S from "./Styles/Header.styles";
import UserPanel from "./UserPanel";

import Character from "../../assets/characters/Login_character.png";


function Header() {
  const { isLoggedIn, nickname, logout, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    setIsPopupOpen(false);
  };

  const closeSearchPopup = () => {
    setIsSearchPopupOpen(false);
  };

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <img src={MainLogo} alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/precreate-song">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
      </S.Nav>
      <S.SearchContainer>
        <S.SearchBtn onClick={() => setIsSearchPopupOpen(true)}>
          search
        </S.SearchBtn>
        {isSearchPopupOpen && (
          <SearchPopup
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={closeSearchPopup}
          />
        )}
      </S.SearchContainer>
      {isLoggedIn ? (
        <S.ProfileLink onClick={togglePopup}>
          <img
            src={profileImage && !profileImage.includes("default_profile.jpeg") ? profileImage : Character}
            alt={nickname}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </S.ProfileLink>
      ) : (
        <S.LoginLink to="/login">Log in</S.LoginLink>
      )}
      {isPopupOpen && (
        <UserPanel onClose={togglePopup} onLogout={handleLogout} />
      )}
    </S.HeaderContainer>
  );
}

export default Header;
