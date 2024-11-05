import React, { useState, useRef, useEffect } from "react";
import * as S from "./Styles/PreCreateSong.style";
import DotNavigation from "../../components/DotNav";
import { useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Character1 from "../../assets/characters/Character_1.png";
import Character2 from "../../assets/characters/Character_2.png";
import Character3 from "../../assets/characters/Character_3.png";

function PreCreateSong() {
  const [activeSection, setActiveSection] = useState("section1");
  const [currentSlide, setCurrentSlide] = useState(0);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: Character1,
      description: "오늘 하루가 담긴 글을 남겨보세요.",
    },
    {
      id: 2,
      image: Character2,
      description: "하나의 글을 선택하면 샌티플이 멋진 음악을 만들어 드려요.",
    },
    {
      id: 3,
      image: Character3,
      description: "나만의 노래로 멋진 플레이리스트를 채워 보아요.",
    },
  ];

  useEffect(() => {
    const section1Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection("section1");
        }
      },
      { threshold: 0.5 }
    );

    const section2Observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection("section2");
        }
      },
      { threshold: 0.5 }
    );

    if (section1Ref.current) {
      section1Observer.observe(section1Ref.current);
    }

    if (section2Ref.current) {
      section2Observer.observe(section2Ref.current);
    }

    return () => {
      section1Observer.disconnect();
      section2Observer.disconnect();
    };
  }, []);

  const scrollToSection1 = () => {
    if (section1Ref.current) {
      const top =
        section1Ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection("section1");
    }
  };

  const scrollToSection2 = () => {
    if (section2Ref.current) {
      const top =
        section2Ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection("section2");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    setIsImageLoaded(false);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsImageLoaded(false);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleCreateSong = () => {
    navigate("/create-song");
  };

  return (
    <S.Container>
      <S.Section ref={section1Ref}>
        <S.Title>MAKE SENTIFL</S.Title>
        <S.S1Description>
          오늘의 하루를 정리하며 당신만의 특별한 음악을 만들어보세요.
        </S.S1Description>
        <S.S1AdditionalText>
          SENTIFL이 당신의 특별할 하루를 만들어 드릴게요.
        </S.S1AdditionalText>
        <S.S1Button onClick={handleCreateSong}>
          <FaMusic /> 나만의 노래를 만들어보세요
        </S.S1Button>
      </S.Section>

      <S.Section ref={section2Ref}>
        <S.Title>MAKE SENTIFL</S.Title>
        <S.ImageContainer>
          <S.ArrowLeft onClick={prevSlide} />
          <S.ImageSection>
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              onLoad={() => setIsImageLoaded(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                visibility: isImageLoaded ? "visible" : "hidden",
              }}
            />
          </S.ImageSection>
          <S.ArrowRight onClick={nextSlide} />
        </S.ImageContainer>

        <S.S2Description>{slides[currentSlide].description}</S.S2Description>
        <S.S2Button onClick={handleCreateSong}>
          <FaMusic /> 나만의 노래를 만들어보세요
        </S.S2Button>

        <S.DotsContainer>
          {slides.map((slide, index) => (
            <S.Dot
              key={slide.id}
              isActive={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </S.DotsContainer>
      </S.Section>

      <DotNavigation
        scrollToSection1={scrollToSection1}
        scrollToSection2={scrollToSection2}
        activeSection={activeSection}
      />
    </S.Container>
  );
}

export default PreCreateSong;
