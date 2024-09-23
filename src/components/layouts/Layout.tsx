import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";
import { SlideInDiv } from "./Styles/Transition.style";
import DotNav from "../DotNav";
import { useState } from "react";

function Layout() {
  const location = useLocation();
  const withSlide = location.state?.withSlide ?? false;
  const [isSliding, setIsSliding] = useState(false);

  return (
    <>
      <S.LayoutContainer>
        <Header />
        <S.MainContent>
          <TransitionGroup component={null}>
            {withSlide ? (
              <CSSTransition
                key={location.key}
                timeout={500}
                classNames="slide"
                onEnter={() => setIsSliding(true)}
                onExited={() => setIsSliding(false)}
              >
                <SlideInDiv>
                  <Outlet />
                </SlideInDiv>
              </CSSTransition>
            ) : (
              <Outlet />
            )}
          </TransitionGroup>
        </S.MainContent>
        <S.DotNavWrapper isSliding={isSliding}>
          <DotNav />
        </S.DotNavWrapper>
        <Footer />
      </S.LayoutContainer>
    </>
  );
}

export default Layout;
