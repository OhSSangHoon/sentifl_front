import { useEffect, useState } from "react";
import Google from "../../assets/icons/social/google.webp";
import Kakao from "../../assets/icons/social/kakao.webp";
import Naver from "../../assets/icons/social/naver.webp";
import * as S from "./Styles/SideBar.style";

function SideBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSignInPopUp = () => {
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isPopupOpen]);

  return (
    <S.SideBar>
      {isPopupOpen && (
        <S.Popup>
          <S.SignForm>
            <S.Signup>
              <S.DelBtn onClick={handleClose}>x</S.DelBtn>
              <h1>Sign In</h1>
              <p>Create your account</p>
            </S.Signup>
            <S.Signdown>
              <S.SocialBtn>
                <img src={Naver} alt="Naver" />
              </S.SocialBtn>
              <S.SocialBtn>
                <img src={Google} alt="Google" />
              </S.SocialBtn>
              <S.SocialBtn>
                <img src={Kakao} alt="Kakao" />
              </S.SocialBtn>
            </S.Signdown>
          </S.SignForm>
        </S.Popup>
      )}
      <S.Logo />
      <S.Menu>
        <S.Menus>
          {/* 나중에 link로 바꿈 */}
          <li>Home</li>
          {/* Login 하면 생김 */}
          <li>Create</li>
          <li>Blog</li>
          <li>Playlist</li>
        </S.Menus>
      </S.Menu>
      <S.Sign>
        <S.SignUl>
          <li>
            <S.SignBtn onClick={handleSignInPopUp}>Sign In</S.SignBtn>
          </li>
        </S.SignUl>
      </S.Sign>
    </S.SideBar>
  );
}

export default SideBar;
