import styled from "styled-components";

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
`;

export const PostListWrapper = styled.div`
  flex-grow: 2;
  max-width: 800px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // min-height: 700px;
  z-index: 900;
`;

export const Post = styled.div`
  margin-left: 30px;
  margin-bottom: 20px;
  padding: 10px;
`;

export const PostContentWrapper = styled.div<{ isChecked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #333;
  gap: 20px;
  border-radius: 10px;
  background-color: ${({ isChecked }) => (isChecked ? "#272727" : "inherit")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #272727;
  }
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
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const PostTitle = styled.h2`
  font-size: 24px;
  margin-right: 15px;
  color: #ffffff;
`;

export const PostDate = styled.span`
  font-size: 14px;
  color: #b5b5b5;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
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

export const PlaySection = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: fixed; /* 고정된 위치에 배치 */
  right: 20px;
  top: 100px;
`;

export const PlayButton = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, #3a3a3a, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #555;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
