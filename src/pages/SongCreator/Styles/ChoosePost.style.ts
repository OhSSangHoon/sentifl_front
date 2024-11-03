import styled from "styled-components";

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 20px;
`;

export const PostListWrapper = styled.div`
  flex-grow: 2;
  max-width: 800px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  width: 100%;
  // min-height: 700px;
`;

export const PostNumber = styled.span`
  font-size: 16px;
  color: #777;
  margin-right: 10px;
  width: 20px;
  text-align: center;
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
  right: 70px;
  top: 100px;

  @media (max-width: 1000px) {
    position: static;
    width: 100%;
    margin-top: 20px;
  }
`;

export const PlayButton = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 230px;
    height: 230px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(
      90deg,
      rgba(47, 90, 241, 0.7) 0%,
      rgba(178, 234, 106, 0.7) 100%
    );
    filter: blur(40px);
    opacity: 0.8;
    z-index: -1;
  }
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

export const HashTagInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #777;
  }
`;

export const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 100px;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

export const LoadingTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
  font-weight: bold;
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #b5b5b5;
  margin-top: 40px;
`;

export const LoadingCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-top: 5px solid #698dbf;
  margin: 100px 0;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const HeaderWrapper = styled.div`
  text-align: left;
  color: #ffffff;
  margin-bottom: 20px;
  margin-left: 40px;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #777777;
`;
