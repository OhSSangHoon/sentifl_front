import styled, { css } from "styled-components";

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
  overflow: hidden;
`;

export const TopLeftInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;

export const InfoText = styled.p`
  font-size: 30px;
  margin-bottom: 40px;
`;

export const ColorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;

export const EmotionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
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
  background-color: transparent;
  color: white;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  svg {
    color: rgba(255, 255, 255, 0.6);
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
export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #1c1c1e;
  border-radius: 10px;
  overflow: hidden;
`;

export const BottomLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const BottomLeftButton = styled.button`
  padding: 10px 20px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const BottomCenterText = styled.p`
  font-size: 16px;
  color: #777777;
  margin: 0;
`;

export const BottomRightButton = styled.button`
  padding: 10px 20px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
export const BottomRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const UpArrowButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    color: #ccc;
    font-size: 24px;
  }
`;

const dropdownAnimation = css`
  &.dropdown-enter {
    transform: translateY(100%);
    opacity: 0;
  }
  &.dropdown-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: transform 300ms ease, opacity 300ms ease;
  }
  &.dropdown-exit {
    transform: translateY(0);
    opacity: 1;
  }
  &.dropdown-exit-active {
    transform: translateY(100%);
    opacity: 0;
    transition: transform 300ms ease, opacity 300ms ease;
  }
`;

export const DropdownContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid white;
  background-color: rgba(28, 28, 30, 0.5);
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: ${({ isVisible }) => (isVisible ? "auto" : "0")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  overflow: hidden;

  ${dropdownAnimation}
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const RightButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-top: 80px;
`;

export const DropdownText = styled.p`
  color: #fffff;
  font-size: 24px;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const DropdownSubText = styled.p`
  color: #aaa;
  font-size: 12px;
  margin-bottom: 30px;
  overflow: hidden;
`;

export const GenreOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
  // height: 150px;
`;

export const GenreButton = styled.button<{ selected: boolean }>`
  font-size: 14px;
  padding: 10px 20px;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  border: 1px solid ${({ selected }) => (selected ? "#3A3A3C" : "#999999")};
  border-radius: 25px;
  color: ${({ selected }) => (selected ? "#3A3A3C" : "#999999")};
  cursor: pointer;
  height: fit-content;
  justify-self: center;
  transition: all 0.3s ease;
  box-shadow: ${({ selected }) =>
    selected
      ? "0px 4px 12px rgba(58, 58, 60, 0.4)"
      : "0px 4px 8px rgba(0, 0, 0, 0.2)"};

  &:hover {
    background-color: ${({ selected }) =>
      selected ? "#e0e0e0" : "rgba(255, 255, 255, 0.2)"};
    color: ${({ selected }) => (selected ? "#3A3A3C" : "#ffffff")};
    border-color: ${({ selected }) => (selected ? "#3A3A3C" : "#ffffff")};
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.3);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    font-size: 14px;
    color: white;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  accent-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

export const PlaylistButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  color: #3a3a3c;
  cursor: pointer;
  margin-top: 10px;
  overflow: hidden;

  &:hover {
    background-color: #dbdbdb;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  color: #3a3a3c;
  cursor: pointer;
  margin-top: 10px;
  overflow: hidden;

  &:hover {
    background-color: #dbdbdb;
  }
`;

export const RedoButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 12px;
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 12px;
  }
`;

export const TitleInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #ccc;
  border-radius: 12px;
  color: #ffffff;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: #ffffff;
  }
`;

export const LabelText = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0 0 5px 0;
  align-self: flex-start;
`;
