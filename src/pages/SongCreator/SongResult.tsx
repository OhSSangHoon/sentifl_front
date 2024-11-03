import React, { useState, useRef, useEffect } from "react";
import * as S from "./Styles/SongResult.style";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { FaPlay, FaPause, FaChevronUp, FaRedo } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { CSSTransition } from "react-transition-group";

const SongResult: React.FC = () => {
  const navigate = useNavigate();
  const { uid, nickname, profileImage } = useAuth();
  const location = useLocation();

  // navigate로 전달된 데이터 받기
  const { title, emotion1, emotion2, musicUrl } = location.state || {};
  const [musicId, setMusicId] = useState<number | null>(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 5
        ? [...prev, genre]
        : prev
    );
  };
  const handleSaveButtonClick = async () => {
    setIsSaveButtonClicked(true);

    if (selectedGenres.length > 0) {
      const hashTagString = selectedGenres.join(" ").trim();
      console.log("선택된 장르 (문자열):", hashTagString);

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          return;
        }

        const hashtagResponse = await axiosInstance.post(
          `/api/v1/music/${musicId}/hashtag`,
          {
            hashTag: hashTagString,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (hashtagResponse.status === 204) {
          alert("해시태그가 성공적으로 저장되었습니다!");
          navigate(`/user/${uid}/playlist`);
        } else {
          const errorCode = hashtagResponse.data?.errorCode;
          if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else {
            console.error("해시태그 저장 실패:", hashtagResponse);
          }
          alert("해시태그 저장에 실패했습니다.");
        }
      } catch (error: any) {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === "CE1") {
          console.error("엘라스틱서치 요청 실패");
        } else {
          console.error("해시태그 저장 중 오류 발생:", error);
        }
        alert("해시태그 저장에 실패했습니다.");
      }
    }
  };

  // const handleCheckboxChange = () => {
  //   setIsCheckboxChecked(!isCheckboxChecked);
  //   if (!isCheckboxChecked) {
  //     console.log("Selected genres:", selectedGenres);
  //   }
  // };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicUrl)); // 플레이리스트에 저장 버튼 클릭 핸들러

  const handleSaveToPlaylist = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      // FastAPI에서 받은 데이터를 스프링 백엔드에 전송
      const springResponse = await axiosInstance.post(
        `/api/v1/music/post/${location.state?.postId}`, // postId를 ChoosePost에서 받아와서 사용
        {
          musicUrl: musicUrl,
          title: title,
          emotion1: emotion1,
          emotion2: emotion2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (springResponse.status === 200 || springResponse.status === 204) {
        alert("노래가 플레이리스트에 성공적으로 저장되었습니다!");
        setIsDropdownVisible(true);
        setMusicId(springResponse.data.id);
      } else {
        const errorCode = springResponse.data?.errorCode;
        if (errorCode === "CE1") {
          console.error("엘라스틱서치 요청 실패");
        } else {
          console.error("노래 저장 실패:", springResponse);
        }
        alert("노래 저장에 실패했습니다.");
      }
    } catch (error: any) {
      const errorCode = error.response?.data?.errorCode;
      if (errorCode === "CE1") {
        console.error("엘라스틱서치 요청 실패");
      } else {
        console.error("노래 저장 중 오류 발생:", error);
      }
      alert("노래 저장 중 오류가 발생했습니다.");
    }
  };

  // 노래가 끝났을 때 실행되는 핸들러
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false); // 노래가 끝나면 재생 버튼으로 변경
    };

    const audio = audioRef.current;
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 재생 버튼 클릭 핸들러
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <S.Wrapper>
      <S.TopLeftInfo>
        <S.InfoText>{nickname} 님의 감정으로 노래를 만들었어요.</S.InfoText>
        <S.BottomCenterText>
          하루를 마무리 하며, 센티플은 당신의 하루를 담은 감정도 분석해
          보았어요.
        </S.BottomCenterText>

        <EmotionDescription emotion={emotion1} />
        <EmotionDescription emotion={emotion2} />
      </S.TopLeftInfo>

      <S.PlayButtonWrapper>
        <S.PlayButton onClick={handlePlayPause}>
          {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
        </S.PlayButton>
      </S.PlayButtonWrapper>

      <S.RedoButton
        onClick={() => {
          navigate("/create-song");
        }}
      >
        다시 생성하기 <FaRedo />
      </S.RedoButton>

      {!isDropdownVisible && (
        <S.BottomContainer>
          <S.BottomLeftGroup>
            <S.BottomLeftButton onClick={handleSaveToPlaylist}>
              MY PLAYLIST 에 저장
            </S.BottomLeftButton>
            <S.BottomCenterText>
              * 생성한 음악을 내 플레이리스트에 저장 후 해시태그를 설정하세요
            </S.BottomCenterText>
          </S.BottomLeftGroup>
          <S.BottomRightGroup>
            <S.BottomRightButton onClick={() => navigate(`/user/${uid}/blog`)}>
              내 블로그로 가기
            </S.BottomRightButton>
            {/* <S.UpArrowButton>
              <FaChevronUp />
            </S.UpArrowButton> */}
          </S.BottomRightGroup>
        </S.BottomContainer>
      )}

      {isDropdownVisible && (
        <CSSTransition
          in={isDropdownVisible}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <S.DropdownContainer isVisible={isDropdownVisible}>
            <S.LeftContainer>
              <S.DropdownText>분위기 및 장르</S.DropdownText>
              <S.DropdownSubText>
                * 최대 5개까지 선택 가능합니다.
              </S.DropdownSubText>
              <S.CheckboxContainer>
                <S.SaveButton onClick={handleSaveButtonClick}>
                  내 게시글에 바로 사용
                </S.SaveButton>
                {/* <S.Checkbox
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <span>내 게시글에 바로 사용</span> */}
              </S.CheckboxContainer>
            </S.LeftContainer>

            <S.GenreOptions>
              {genres.map((genre) => (
                <S.GenreButton
                  key={genre}
                  selected={selectedGenres.includes(genre)}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </S.GenreButton>
              ))}
            </S.GenreOptions>
            <S.PlaylistButton onClick={() => navigate(`/user/${uid}/playlist`)}>
              플레이리스트로 이동
            </S.PlaylistButton>
            {/* 
          <S.ChevronDownButton onClick={toggleDropdown}>
            <FaChevronDown />
          </S.ChevronDownButton> */}
          </S.DropdownContainer>
        </CSSTransition>
      )}
    </S.Wrapper>
  );
};

export default SongResult;
export { EmotionDescription };

const genres = [
  "재즈",
  "힙합",
  "차분한",
  "행복한",
  "사랑스러운",
  "클래식",
  "댄스",
  "우울한",
  "따뜻한",
  "로맨틱한",
  "블루스",
  "인디",
  "일렉트로닉",
  "슬픔",
  "고요한",
  "신나는",
  "평화로운",
];

const emotionColors: { [key: string]: string } = {
  행복: "#FFD700",
  사랑: "#FF1493",
  불안: "#6A0DAD",
  분노: "#8B0000",
  우울: "#000080",
  슬픔: "#4169E1",
  중립: "#A9A9A9",
};

const emotionDescriptions: { [key: string]: string } = {
  행복: "강을 뒤덮은 밝고 노란 꽃밭",
  사랑: "하늘에서 피어난 커다란 폭죽",
  불안: "어두운 숲속 안에 고여 있는 연못",
  분노: "마음속 요동치는 거친파도",
  우울: "얕게 흐르는 빛물에 꺼져가는 불꽃",
  슬픔: "텅빈 고요한 새벽 한밤중의 빛물",
  중립: "흐린하늘아래 선선한 바람",
};

const EmotionDescription: React.FC<{ emotion: string }> = ({ emotion }) => (
  <S.ColorInfo>
    <S.ColorBox color={emotionColors[emotion]} />
    <S.EmotionTextWrapper>
      <S.ColorText>{emotion}</S.ColorText>
      <S.ColorText>{emotionDescriptions[emotion]}</S.ColorText>
    </S.EmotionTextWrapper>
  </S.ColorInfo>
);
