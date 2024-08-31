import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import Home from "../pages/home/Home";
import MyBlog from "../pages/myblog/MyBlog";

import NeighborBlog from "../pages/NeighborBlog/NeighborBlog";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/musicrecommend" element={<MusicRecommend />} />
        <Route path="/neighborblog" element={<NeighborBlog />} />
      </Route>
    </Routes>
  );
}

export default Router;
