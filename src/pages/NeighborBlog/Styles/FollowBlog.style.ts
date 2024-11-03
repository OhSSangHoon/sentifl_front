import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background: #0d0d0e;
  color: #ffffff;
  height: auto;
  min-height: 100vh;
  overflow: hidden;
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;
