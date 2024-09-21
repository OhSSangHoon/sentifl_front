import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import ModifyPage from "../pages/Create/ModifyPage";
import Home from "../pages/home/Home";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Success from "../pages/Login/SuccessPage";
import MusicRecommend from "../pages/musicRecommend/MusicRecommend";
import BlogPost from "../pages/myblog/BlogPost/BlogPost";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NewPost from "../pages/NeighborBlog/NewPost";
import Playlist from "../pages/Playlist/Playlist";
import CreateSong from "../pages/SongCreator/CreateSong";
import SongResult from "../pages/SongCreator/SongResult";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<Success />} />
        <Route path="/auth/add-info" element={<AddInfo />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/user/:uid/blog" element={<MyBlog />} />
        <Route path="/user/:uid/post/:postId" element={<BlogPost />} />
        <Route path="/modify/:postId" element={<ModifyPage />} />
        <Route path="/musicrecommend" element={<MusicRecommend />} />
        <Route path="/user/:uid/following-newpost" element={<NewPost />} />
        <Route path="/create-song" element={<CreateSong />} />
        <Route path="/song-result" element={<SongResult />} />
        <Route path="/user/:uid/playlist" element={<Playlist />} />
      </Route>
    </Routes>
  );
}

export default Router;
