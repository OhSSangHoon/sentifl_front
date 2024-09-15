import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: 100vh;
  background-color: #0d0d0e;
  color: white;
  position: relative;
  margin-top: 100px;
`;

export const TopLeftInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;

export const InfoText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ColorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  margin-right: 10px;
`;

export const ColorText = styled.p`
  font-size: 14px;
  color: #ccc;
`;

export const PlayButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const PlayButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const BottomLeftButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 20px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid #fff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const TitleWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

export const BottomRightText = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;
  color: white;
`;
