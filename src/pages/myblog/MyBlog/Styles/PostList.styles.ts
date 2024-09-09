import styled from "styled-components";

export const Content = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const Post = styled.div`
  margin-left: 30px;
  margin-bottom: 20px;
  padding: 10px;
`;

export const PostContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PostInfo = styled.div`
  flex: 2;
  padding-right: 15px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const PostTitle = styled.h2`
  font-size: 24px;
  margin-right: 15px;
  color: #ffffff;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #b5b5b5;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const PostDate = styled.span`
  font-size: 14px;
  color: #b5b5b5;
`;

export const ActionButton = styled.button`
  font-size: 12px;
  color: #b5b5b5;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

export const HeartIcon = styled.span`
  font-size: 16px;
  color: #b5b5b5;
  margin-left: 10px;
`;

export const PostDescription = styled.p`
  font-size: 14px;
  color: #b5b5b5;
  line-height: 1.5;
  flex-wrap: wrap;
`;

export const PostImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
  background: white;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.span`
  font-size: 16px;
  margin: 0 10px;
`;
