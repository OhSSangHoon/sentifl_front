import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
  max-width: 800px;
`;

export const PostItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #444;
  padding: 15px 0;
  color: #bbb;

  & > span {
    font-size: 0.875rem;
  }
`;

export const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
`;
