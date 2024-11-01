import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface DotProps {
  isActive: boolean;
}

export const Container = styled.div`
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding-top: 100px;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: white;
  margin-bottom: 20px;
`;

export const S1Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const S1Description = styled.p`
  font-size: 16px;
  color: white;
  margin-top: 36px;
`;

export const S2Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const S2Description = styled.p`
  font-size: 18px;
  color: white;
  margin-top: 36px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 350px;
`;

export const ArrowLeft = styled(FaArrowLeft)`
  position: absolute;
  left: 200px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

export const ArrowRight = styled(FaArrowRight)`
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Dot = styled.div<DotProps>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "white" : "gray")};
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
