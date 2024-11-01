import styled from "styled-components";

interface DotNavigationProps {
  scrollToHome: () => void;
  scrollToHashTags: () => void;
  scrollToMusicRecommend: () => void;
  scrollToNewPost: () => void;
  activeSection: string;
}

const DotNavigation = ({
  scrollToHome,
  scrollToHashTags,
  scrollToMusicRecommend,
  scrollToNewPost,
  activeSection,
}: DotNavigationProps) => {
  return (
    <DotContainer>
      <Dot onClick={scrollToHome} active={activeSection === "home"} />
      <Dot onClick={scrollToHashTags} active={activeSection === "Hashtags"} />
      <Dot
        onClick={scrollToMusicRecommend}
        active={activeSection === "musicRecommend"}
      />
      <Dot onClick={scrollToNewPost} active={activeSection === "newPost"} />
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
