import styled from "styled-components";

export const MainContent = styled.div`
  margin-left: 350px;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 20px;
`;

export const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BlogItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 70px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const BlogTitle = styled.span`
  flex-grow: 1;
  font-size: 14px;
  color: #fff;
`;

export const BlogDate = styled.span`
  font-size: 12px;
  color: #ccc;
  margin-right: 10px;
`;

export const CheckBox = styled.input`
  width: 15px;
  height: 15px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin: 0 15px;
`;
