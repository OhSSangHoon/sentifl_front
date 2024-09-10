import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";
import { SlideInDiv } from "./Styles/Transition.style";
import UserPanel from "./UserPanel";
import { useState } from "react";

function Layout() {
  const location = useLocation();
  const withSlide = location.state?.withSlide || false;

  const [isUserPanelVisible, setUserPanelVisible] = useState(false);

  const toggleUserPanel = () => {
    setUserPanelVisible((prevState) => !prevState);
  };

  return (
    <>
      <S.LayoutContainer>
        <Header
          toggleUserPanel={toggleUserPanel}
          isUserPanelVisible={isUserPanelVisible}
        />
        <S.MainContent>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={500}
              classNames={withSlide ? "slide" : ""}
            >
              <SlideInDiv>
                <Outlet />
              </SlideInDiv>
            </CSSTransition>
          </TransitionGroup>
          {isUserPanelVisible && <UserPanel />}
        </S.MainContent>
        <Footer />
      </S.LayoutContainer>
    </>
  );
}

export default Layout;
