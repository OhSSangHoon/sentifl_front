import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const DotNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  const handleNavigate = (path: string) => {
    navigate(path, { state: { withSlide: true } });
  };

  return (
    <DotContainer>
      <Dot
        onClick={() => handleNavigate("/")}
        active={location.pathname === "/"} // 현재 경로와 비교하여 활성화 상태 설정
      />
      <Dot
        onClick={() => handleNavigate("/musicrecommend")}
        active={location.pathname === "/musicrecommend"} // 현재 경로와 비교하여 활성화 상태 설정
      />
      <Dot
        onClick={() => handleNavigate("/user/:uid/following-newposts")}
        active={location.pathname === "/user/:uid/following-newposts"} // 현재 경로와 비교하여 활성화 상태 설정
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

// active 상태에 따라 스타일 변경
const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) =>
    props.active ? "gray" : "white"}; // 활성화된 경우 색상 변경
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;
