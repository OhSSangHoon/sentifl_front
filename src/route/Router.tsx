import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import Home from "../pages/home/Home";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Success from "../pages/Login/SuccessPage";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NeighborBlogList from "../pages/NeighborBlog/NeighborBlogList";
import CreateSong from "../pages/SongCreator/CreateSong";
import SongResult from "../pages/SongCreator/SongResult";
import Playlist from "../pages/Playlist/Playlist";
import ProtectedRoute from "./ProtectedRoute";
import ModifyPage from "../pages/Create/ModifyPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<Success />} />
        <Route path="/auth/add-info" element={<AddInfo />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/modify/:postId" element={<ModifyPage />} />
        <Route path="/myblog" element={<ProtectedRoute><MyBlog /></ProtectedRoute>} />
        <Route path="/musicrecommend" element={<MusicRecommend />} />
        <Route path="/neighborbloglist" element={<NeighborBlogList />} />
        <Route path="/createsong" element={<CreateSong />} />
        <Route path="/songresult" element={<SongResult />} />
        <Route path="/playlist" element={<Playlist />} />
      </Route>
    </Routes>
  );
}

export default Router;
