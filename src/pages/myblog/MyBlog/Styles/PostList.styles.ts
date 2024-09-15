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
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #333;
  gap: 20px;
`;

export const PostInfo = styled.div`
  flex: 2;
`;

export const PostImage = styled.img`
  flex: 1;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
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

  &:active,
  &:focus {
    font-weight: bold;
    color: #ffffff;
  }
`;

export const HeartIcon = styled.span`
  font-size: 16px;
  color: "#b5b5b5"
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const PostDescription = styled.p`
  font-size: 14px;
  color: #b5b5b5;
  line-height: 1.5;
  flex-wrap: wrap;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  min-height: 60px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 12px 20px;
  margin: 0 5px;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ active }) => (active ? "#D9D9D9" : "#777777")};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border: none;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    color: ${({ active }) => (active ? "#fff" : "#D9D9D9")};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const OverlayImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
`;
