import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";
import { SlideInDiv } from "./Styles/Transition.style";
import { useState } from "react";
import UserPanel from "./UserPanel";

function Layout() {
  const location = useLocation();
  const withSlide = location.state?.withSlide ?? false;

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
              >
                <SlideInDiv>
                  <Outlet />
                </SlideInDiv>
              </CSSTransition>
            ) : (
              // 애니메이션이 필요 없는 경우 단순히 Outlet을 렌더링
              <Outlet />
            )}
          </TransitionGroup>
        </S.MainContent>
        <Footer />
      </S.LayoutContainer>
    </>
  );
}

export default Layout;
