import React from "react";
import styled from "styled-components";
import DotNav from "../../components/DotNav";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
  max-width: 800px;
`;

const PostItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #444;
  padding: 15px 0;
  color: #bbb;

  & > span {
    font-size: 0.875rem;
  }
`;

const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;

function NeighborBlog() {
  return (
    <Container>
      <Title>NEW POST</Title>
      <PostList>
        <PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </PostItem>
        <PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </PostItem>
        <PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </PostItem>
        <PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </PostItem>
      </PostList>
      <DotNavWrapper>
        <DotNav />
      </DotNavWrapper>
    </Container>
  );
}

export default NeighborBlog;
