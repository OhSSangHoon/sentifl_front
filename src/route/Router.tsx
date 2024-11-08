import { Route, Routes } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Create from "../pages/Create/Create";
import ModifyPage from "../pages/Create/ModifyPage";
import Home from "../pages/home/Home";
import AddInfo from "../pages/Login/AddInfo";
import Login from "../pages/Login/Login";
import Success from "../pages/Login/SuccessPage";
import MusicRecommend from "../pages/home/MusicRecommend";
import BlogPost from "../pages/myblog/BlogPost/BlogPost";
import MyBlog from "../pages/myblog/MyBlog/MyBlog";
import NewPost from "../pages/home/NewPost";
import Playlist from "../pages/Playlist/Playlist";
import CreateSong from "../pages/SongCreator/CreateSong";
import SongResult from "../pages/SongCreator/SongResult";
import PreCreateSong from "../pages/SongCreator/PreCreateSong";
import FollowBlog from "../pages/NeighborBlog/FollowBlog";
import FollowBlogPost from "../pages/NeighborBlog/FollowBlogPost";
import SearchResult_Song from "../pages/Search/SearchResult_Song";

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
        <Route path="/create-song" element={<CreateSong />} />
        <Route path="/song-result" element={<SongResult />} />
        <Route path="/user/:uid/playlist" element={<Playlist />} />
        <Route path="/precreate-song" element={<PreCreateSong />} />
        <Route path="/follow/:uid/blog" element={<FollowBlog />} />
        <Route path="/follow/:uid/post/:postId" element={<FollowBlogPost />} />
        <Route
          path="/search-result/song/keyword"
          element={<SearchResult_Song />}
        />
      </Route>
    </Routes>
  );
}

export default Router;
