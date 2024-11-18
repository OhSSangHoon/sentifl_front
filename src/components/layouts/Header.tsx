import { useEffect, useState } from "react";
import MainLogo from "../../assets/logos/logo.png";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import SearchPopup from "./SearchPopup";
import * as S from "./Styles/Header.styles";
import UserPanel from "./UserPanel";

import Character from "../../assets/characters/Login_character.png";

function Header() {
  const { isLoggedIn, nickname, logout, uid } = useAuth();
  const [profileImage, setProfileImage] = useState(Character);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn || !uid) return;

      try {
        const response = await axiosInstance.get(`/api/v1/auth/user/search`, {
          params: { keyword: uid, lastId: 0 },
        });

        console.log("User Profile Response: ", response.data);

        if (response.data.length > 0) {
          const user = response.data[0];
          setProfileImage(user.profile || Character);
        }
      } catch (error) {
        console.log("프로필 정보를 가져오지 못했습니다.", error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, uid]);

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
            src={
              profileImage && !profileImage.includes("default_profile")
                ? profileImage
                : Character
            }
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
