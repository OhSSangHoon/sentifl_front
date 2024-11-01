import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface DotNavigationProps {
<<<<<<< HEAD
  scrollToHome: () => void;
  scrollToHashTags: () => void;
  scrollToMusicRecommend: () => void;
  scrollToNewPost: () => void;
=======
  scrollToHome?: () => void;
  scrollToMusicRecommend?: () => void;
  scrollToNewPost?: () => void;
  scrollToSection1?: () => void;
  scrollToSection2?: () => void;
>>>>>>> 7b327693fd0918bd4c88d8cb71b844407f0f4878
  activeSection: string;
}

const DotNavigation = ({
  scrollToHome,
  scrollToHashTags,
  scrollToMusicRecommend,
  scrollToNewPost,
  scrollToSection1,
  scrollToSection2,
  activeSection,
}: DotNavigationProps) => {
  const location = useLocation();

  return (
    <DotContainer>
<<<<<<< HEAD
      <Dot onClick={scrollToHome} active={activeSection === "home"} />
      <Dot onClick={scrollToHashTags} active={activeSection === "Hashtags"} />
      <Dot
        onClick={scrollToMusicRecommend}
        active={activeSection === "musicRecommend"}
      />
      <Dot onClick={scrollToNewPost} active={activeSection === "newPost"} />
=======
      {location.pathname === "/" ? (
        <>
          <Dot onClick={scrollToHome} active={activeSection === "home"} />
          <Dot
            onClick={scrollToMusicRecommend}
            active={activeSection === "musicRecommend"}
          />
          <Dot onClick={scrollToNewPost} active={activeSection === "newPost"} />
        </>
      ) : location.pathname === "/precreate-song" ? (
        <>
          <Dot
            onClick={scrollToSection1}
            active={activeSection === "section1"}
          />
          <Dot
            onClick={scrollToSection2}
            active={activeSection === "section2"}
          />
        </>
      ) : null}
>>>>>>> 7b327693fd0918bd4c88d8cb71b844407f0f4878
    </DotContainer>
  );
};

export default DotNavigation;

const DotContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  z-index: 1000;
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
