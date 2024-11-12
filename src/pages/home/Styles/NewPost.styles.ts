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
  font-size: 3em;
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
  font-size: 1.2em;
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

  &:hover,
  &:active {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const PostTitle = styled.p`
  text-align: left;
  margin-top: 10px;
  color: #fff;
  font-size: 1.1em;
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
  font-size: 0.8em;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const AuthorId = styled.p`
  margin: 5px 0 0;
  text-align: left;
  font-size: 0.9em;
`;

export const CreatedTime = styled.p`
  margin: 5px 0 0;
  text-align: left;
  font-size: 0.8em;
  color: #888;
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
