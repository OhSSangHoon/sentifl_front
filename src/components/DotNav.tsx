import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DotNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path, { state: { withSlide: true } });
  };

  return (
    <DotContainer>
      <Dot onClick={() => handleNavigate("/")} />
      <Dot onClick={() => handleNavigate("/musicrecommend")} />
      <Dot onClick={() => handleNavigate("/neighborblog")} />
    </DotContainer>
  );
};

export default DotNavigation;

const DotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;
