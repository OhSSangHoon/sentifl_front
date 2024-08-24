import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import * as S from "./Styles/Layout.style";

function Layout() {
  return (
    <>
      <S.LayoutContainer>
        <Header />
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.LayoutContainer>
      <Footer />
    </>
  );
}

export default Layout;
