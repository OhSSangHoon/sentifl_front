import React, { useState, useRef, useEffect } from "react";
import * as S from "./Styles/PreCreateSong.style";
import DotNavigation from "../../components/DotNav";
import { useNavigate } from "react-router-dom";

function PreCreateSong() {
  const [activeSection, setActiveSection] = useState("section1");
  const [currentSlide, setCurrentSlide] = useState(0);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: "/path/to/image1.jpg",
      description: "오늘 하루가 담긴 글을 남겨보세요.",
    },
    {
      id: 2,
      image: "/path/to/image2.jpg",
      description: "하나의 글을 선택하면 샌티플이 멋진 음악을 만들어 드려요.",
    },
    {
      id: 3,
      image: "/path/to/image3.jpg",
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
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleCreateSong = () => {
    navigate("/create-song");
  };

  return (
    <S.Container>
      <S.Section ref={section1Ref}>
        <S.Title>MAKE SENTIFL</S.Title>
        <S.S1Button onClick={handleCreateSong}>
          나만의 노래를 만들어보세요
        </S.S1Button>
        <S.S1Description>
          내가 작성한 블로그 글을 선택하고 해시태그를 입력하면, AI가 자동으로
          나만의 맞춤형 노래를 제작해줍니다.
        </S.S1Description>
      </S.Section>

      <S.Section ref={section2Ref}>
        <S.Title>MAKE SENTIFL</S.Title>
        <S.ImageContainer>
          <S.ArrowLeft onClick={prevSlide} />
          <S.ImageSection>
            <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </S.ImageSection>
          <S.ArrowRight onClick={nextSlide} />
        </S.ImageContainer>

        <S.S2Description>{slides[currentSlide].description}</S.S2Description>
        <S.S2Button onClick={handleCreateSong}>
          나만의 노래를 만들어보세요
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
