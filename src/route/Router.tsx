import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import Home from "../pages/home/Home";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Success from "../pages/Login/SuccessPage";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";
import BlogPost from "../pages/myblog/BlogPost/BlogPost";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NeighborBlog from "../pages/NeighborBlog/NeighborBlog";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<Success />} />
        <Route path="/auth/add-info" element={<AddInfo />} />
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
