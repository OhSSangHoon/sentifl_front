import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const DotNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path, { state: { withSlide: true } });
  };

  return (
    <DotContainer>
      <Dot
        onClick={() => handleNavigate("/")}
        active={location.pathname === "/"}
      />
      <Dot
        onClick={() => handleNavigate("/musicrecommend")}
        active={location.pathname === "/musicrecommend"}
      />
      <Dot
        onClick={() => handleNavigate("/user/:uid/following-newpost")}
        active={location.pathname === "/user/:uid/following-newpost"}
      />
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

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "gray" : "white")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;
