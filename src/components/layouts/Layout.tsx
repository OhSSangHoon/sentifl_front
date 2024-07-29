import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import * as S from "./Styles/Layout.style";

function Layout() {
    return (
        <>
            <Header />
            <S.LayoutContainer>
                <SideBar />
                <S.MainContent>
                    <Outlet />
                </S.MainContent>
            </S.LayoutContainer>
            <Footer />
        </>
    );
}

export default Layout;
