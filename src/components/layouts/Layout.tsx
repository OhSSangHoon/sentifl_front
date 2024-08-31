// import { Outlet, useLocation } from "react-router-dom";
// import Footer from "./Footer";
// import Header from "./Header";
// import * as S from "./Styles/Layout.style";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { FadeInDiv } from "./Styles/Transition.style"; // 새로 만든 styled-component import

// function Layout() {
//   const location = useLocation();

//   return (
//     <>
//       <S.LayoutContainer>
//         <Header />
//         <S.MainContent>
//           <TransitionGroup>
//             <CSSTransition key={location.key} timeout={300} classNames="fade">
//               <FadeInDiv>
//                 <Outlet />
//               </FadeInDiv>
//             </CSSTransition>
//           </TransitionGroup>
//         </S.MainContent>
//       </S.LayoutContainer>
//       <Footer />
//     </>
//   );
// }

// export default Layout;

import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SlideInDiv } from "./Styles/Transition.style";

function Layout() {
  const location = useLocation();

  return (
    <>
      <S.LayoutContainer>
        <Header />
        <S.MainContent>
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={500} classNames="slide">
              <SlideInDiv>
                <Outlet />
              </SlideInDiv>
            </CSSTransition>
          </TransitionGroup>
        </S.MainContent>
      </S.LayoutContainer>
      <Footer />
    </>
  );
}

export default Layout;
