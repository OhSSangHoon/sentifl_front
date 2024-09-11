// 내 블로그
import styled from "styled-components";
import PostList from "./PostList";
import Sidebar from "./SideBar";

const MyBlog = () => {
  return (
    <Container>
      <Sidebar />
      <PostListWrapper>
        <PostList />
      </PostListWrapper>
    </Container>
  );
};

export default MyBlog;

const Container = styled.div`
  display: flex;
  background: #0d0d0e;
  color: #ffffff;
  height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 70px);
  padding-right: 20px;

  // 스크롤바 숨김
  ::-webkit-scrollbar {
    display: none;
  }
`;
