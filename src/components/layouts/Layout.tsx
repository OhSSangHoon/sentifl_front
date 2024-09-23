import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";
import { SlideInDiv } from "./Styles/Transition.style";

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
