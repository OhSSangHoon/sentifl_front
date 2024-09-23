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

  const dotNavVisiblePaths = [
    "/",
    "/musicrecommend",
    "/user/:uid/following-newpost",
  ];
  // 현재 경로가 dotNavVisiblePaths 중 하나와 일치하는지 확인
  const showDotNav = dotNavVisiblePaths.some((path) =>
    new RegExp(`^${path.replace(":uid", "[^/]+")}$`).test(location.pathname)
  );

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
              <Outlet />
            )}
          </TransitionGroup>
        </S.MainContent>
        {showDotNav && (
          <S.DotNavWrapper>
            <DotNav />
          </S.DotNavWrapper>
        )}
        <Footer />
      </S.LayoutContainer>
    </>
  );
}

export default Layout;
