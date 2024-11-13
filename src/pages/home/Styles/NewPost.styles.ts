import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  position: relative;
`;

export const Title = styled.h1`
  margin-top: 100px;
  font-size: 55px;
  font-weight: 300;
  text-align: center;
  color: #fff;
`;

export const HashInt = styled.div`
  width: 100%;
  color: #fff;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 100px;
  text-align: center;
  font-size: 14px;
  font-weight: 100;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const PostList = styled.div`
  width: 80%;
  margin: 10px auto;
  display: flex;
  will-change: transform;
  overflow: visible;
`;

export const PostItem = styled.div`
  position: relative;
  flex: 0 0 calc(100% / 5 - 16px);
  max-width: calc(100% / 5 - 16px);
  height: 400px;
  background-color: #1a1a1b;
  border-radius: 8px;
  margin: 0 8px;
  padding: 20px;
  color: #bbb;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.3s ease, width 0.3s ease, box-shadow 0.3s ease;

  & > span {
    font-size: 0.875rem;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

    & > PostTitle {
      text-decoration: underline;
    }
  }
`;

export const PostTitle = styled.p`
  text-align: left;
  margin-top: 10px;
  color: #bbb;
  font-size: 1.1em;
  font-weight: 700;
`;

export const thumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #444;
  border: none;
`;

export const PostContents = styled.p`
  margin: 10px 0;
  text-align: left;
  color: #959595;
  font-family: Noto Sans Light, sans-serif;
  font-weight: 100;
`;

export const Box = styled.div`
  width: 100%;
  position: absolute;
  bottom: 15px;
`;

export const Writter = styled.p`
  top: 0;
  bottom: 0;
  left: 0;
  float: left;
  color: #bfbfbf;
  font-family: Noto Sans Light, sans-serif;
  font-weight: 500;
`;

export const ico_by = styled.span`
  color: #bfbfbf;
  font-family: Georgia, sans-serif;
  font-style: italic;
`;

export const Date = styled.p`
  right: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10%;
  margin-top: 20px;
`;

export const LoadMoreButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  background: transparent;
  color: #ffffff;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #111;
  }

  &:disabled {
    background-color: #333;
    color: #ddd;
    cursor: not-allowed;
  }
`;

export const LoadMoreButtonLeft = styled(LoadMoreButton)`
  left: 80px;
  color: #ffffff;
`;

export const LoadMoreButtonRight = styled(LoadMoreButton)`
  right: 80px;
  color: #ffffff;
`;
