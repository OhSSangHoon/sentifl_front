import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import Home from "../pages/home/Home";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NeighborBlog from "../pages/NeighborBlog/NeighborBlog";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";
import Login from "../pages/Login/Login";
import BlogPost from "../pages/myblog/BlogPost/BlogPost";
import NicknameSetup from "../pages/Login/NicknameSetup";
import CreateSong from "../pages/SongCreator/CreateSong";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* 첫 로그인 시 닉네임 추가 */}
        <Route path="/nicknamesetup" element={<NicknameSetup />} />
        <Route path="/Create" element={<Create />} />
        {/* 내 블로그 */}
        <Route path="/myblog" element={<MyBlog />} />
        {/* 내 블로그-작성글 */}
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/musicrecommend" element={<MusicRecommend />} />
        <Route path="/neighborblog" element={<NeighborBlog />} />
        {/* 노래 제작 페이지 */}
        <Route path="/createsong" element={<CreateSong />} />
      </Route>
    </Routes>
  );
}

export default Router;
