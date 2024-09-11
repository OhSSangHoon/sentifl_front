import { useState } from "react";
import { useAuth } from "../../AuthProvider"; // useAuth 사용
import * as S from "./Styles/Header.styles";

function Header() {
  const { isLoggedIn, nickname, logout } = useAuth();
  const profileImage = localStorage.getItem("profileImage");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    setIsPopupOpen(false);
  };

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <img src="/path" alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/myblog">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
      </S.Nav>
      {isLoggedIn ? (
        <S.ProfileLink onClick={togglePopup}>
          <img
            src={profileImage || "/default-profile.png"}
            alt={nickname}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </S.ProfileLink>
      ) : (
        <S.LoginLink to="/login">Log in</S.LoginLink>
      )}
      {isPopupOpen && <ProfilePopup onClose={togglePopup} onLogout={handleLogout}/>} {/* 팝업 컴포넌트 호출 */}
    </S.HeaderContainer>
  );
}

export default Header;

// ProfilePopup 컴포넌트
interface ProfilePopupProps {
  onClose: () => void;
  onLogout: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ onClose, onLogout }) => {
  const { nickname, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");

  return (
    <S.PopupOverlay>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.ProfileImage src={profileImage || "/default-profile.png"} alt={nickname} />
        <S.ProfileInfo>
          <h2>{nickname}</h2>
          <p>UID: {uid}</p>
          <p>Follow: 23 | Following: 25</p>
        </S.ProfileInfo>
        <S.LogoutButton onClick={onLogout}>Log out</S.LogoutButton> {/* Logout button */}
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};