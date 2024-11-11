import { useEffect, useRef, useState } from "react";
import DotNav from "../../components/DotNav";
import Hashtags from "./Hashtags";
import MusicRecommend from "./MusicRecommend";
import NewPost from "./NewPost";
import * as S from "./Styles/Home.styles";

function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const HashtagsRef = useRef<HTMLDivElement>(null);
  const musicRecommendRef = useRef<HTMLDivElement>(null);
  const newPostRef = useRef<HTMLDivElement>(null);

  // 현재 활성화된 섹션 상태
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === homeRef.current) {
            setActiveSection("home");
          } else if (entry.target === HashtagsRef.current) {
            setActiveSection("Hashtags");
          } else if (entry.target === musicRecommendRef.current) {
            setActiveSection("musicRecommend");
          } else if (entry.target === newPostRef.current) {
            setActiveSection("newPost");
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (homeRef.current) observer.observe(homeRef.current);
    if (HashtagsRef.current) observer.observe(HashtagsRef.current);
    if (musicRecommendRef.current) observer.observe(musicRecommendRef.current);
    if (newPostRef.current) observer.observe(newPostRef.current);

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (HashtagsRef.current) observer.unobserve(HashtagsRef.current);
      if (musicRecommendRef.current)
        observer.unobserve(musicRecommendRef.current);
      if (newPostRef.current) observer.unobserve(newPostRef.current);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <S.PageContainer>
      <DotNav
        scrollToHome={() => scrollToSection(homeRef)}
        scrollToHashTags={() => scrollToSection(HashtagsRef)}
        scrollToMusicRecommend={() => scrollToSection(musicRecommendRef)}
        scrollToNewPost={() => scrollToSection(newPostRef)}
        activeSection={activeSection}
      />
      <S.Section ref={homeRef}>
        <S.Background>
          <S.TextContainer>
            <S.MainText>
              SENTIFL 에서 마음속에 담아 놓았던 <br />
              당신만의 이야기를 담아보세요
            </S.MainText>
            <S.SubText>
              세상에서 단 하나 뿐인 특별한 노래를 만들어드릴게요
            </S.SubText>
          </S.TextContainer>
          <S.Circle
            size="800px"
            top="70%"
            left="30%"
            translateX="-50%"
            translateY="-50%"
            gradient="linear-gradient(135deg, #F12FBB 0%, #B2EA6A 100%)"
          />
          <S.Circle
            size="800px"
            top="50%"
            left="70%"
            translateX="-50%"
            translateY="-50%"
            gradient="linear-gradient(135deg, #2B8DBE 0%, #C06AEA 100%)"
          />
        </S.Background>
      </S.Section>

      <S.Section ref={HashtagsRef}>
        <Hashtags />
      </S.Section>

      <S.Section ref={musicRecommendRef}>
        <MusicRecommend />
      </S.Section>

      <S.Section ref={newPostRef}>
        <NewPost />
      </S.Section>
    </S.PageContainer>
  );
}

export default Home;
