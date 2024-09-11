// 내 블로그
import styled from "styled-components";
import PostList from "./PostList";
import Sidebar from "./SideBar";

const MyBlog = () => {
  return (
    <Container>
      <Sidebar />
      <PostList />
    </Container>
  );
};

export default MyBlog;

const Container = styled.div`
  display: flex;
  background: #0d0d0e;
  color: #ffffff;
  height: 100vh;
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
`;
