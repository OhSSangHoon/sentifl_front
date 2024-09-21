import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url("https://your-image-url.com");
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Icon = styled.div`
  color: #fff;
  font-size: 24px;
  margin-bottom: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  border-radius: 25px;
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  flex-grow: 1;
  font-size: 16px;
  padding-left: 10px;
`;

export const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-left: 10px;
`;

export const HintText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;
