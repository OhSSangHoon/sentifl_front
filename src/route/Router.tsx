import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import Home from "../pages/home/Home";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NeighborBlog from "../pages/NeighborBlog/NeighborBlog";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";
import Login from "../pages/Login/Login";
import BlogPost from "../pages/myblog/BlogPost/BlogPost";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/musicrecommend" element={<MusicRecommend />} />
        <Route path="/neighborblog" element={<NeighborBlog />} />
      </Route>
    </Routes>
  );
}

export default Router;
