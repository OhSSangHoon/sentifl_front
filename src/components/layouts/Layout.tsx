import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import * as S from "./Styles/Layout.style";

function Layout() {
  return (
    <>
      <S.MainContent>
        <Header />
        <S.Content>
          <Outlet />
          {/* <SideBar /> */}
        </S.Content>
      </S.MainContent>
      <Footer />
    </>
  );
}

export default Layout;
