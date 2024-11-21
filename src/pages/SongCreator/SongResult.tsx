import React, { useState, useRef, useEffect } from "react";
import * as S from "./Styles/SongResult.style";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { CSSTransition } from "react-transition-group";

const SongResult: React.FC = () => {
  const navigate = useNavigate();
  const { uid, nickname, profileImage } = useAuth();
  const location = useLocation();

  // navigate로 전달된 데이터 받기
  const { title, emotion, musicUrl } = location.state || {};
  // const { title, emotion1, emotion2, musicUrl } = location.state || {};

  const [musicId, setMusicId] = useState<number | null>(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title || "");

  const videoUrl = emotionVideos[emotion] || emotionVideos["중립"];
  // const videoUrl = emotionVideos[emotion1] || emotionVideos["중립"];
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicUrl));

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
    }
  }, []);

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

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const postId = location.state?.postId;
      if (!postId) {
        alert("게시물 ID를 찾을 수 없습니다.");
        return;
      }

      let titleChanged = false;
      let hashtagsChanged = false;

      if (editedTitle !== (title || "")) {
        titleChanged = true;
      }

      if (selectedGenres.length > 0) {
        hashtagsChanged = true;
      }

      // 제목이 변경되었을 경우 노래 정보 수정 API 호출
      if (titleChanged) {
        const updateResponse = await axiosInstance.put(
          `/api/v1/music?postId=${postId}`,
          {
            musicUrl: musicUrl,
            title: editedTitle,
            emotion: emotion,
            // emotion1: emotion1,
            // emotion2: emotion2,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (updateResponse.status === 204) {
          console.log("노래 정보가 성공적으로 수정되었습니다!");
        } else {
          const errorCode = updateResponse.data?.errorCode;
          if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else if (errorCode === "sp1") {
            alert("존재하지 않는 게시물입니다.");
          } else {
            console.error("노래 정보 수정 실패:", updateResponse);
          }
          alert("노래 정보 수정에 실패했습니다.");
        }
      }

      // 해시태그가 선택된 경우 해시태그 저장 API 호출
      if (hashtagsChanged) {
        const hashTagString = selectedGenres.join(" ").trim();

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
          console.log("해시태그가 성공적으로 저장되었습니다!");
        } else {
          const errorCode = hashtagResponse.data?.errorCode;
          if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else if (errorCode === "SA9") {
            alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
          } else if (errorCode === "SM1") {
            alert("존재하지 않는 노래입니다.");
          } else {
            console.error("해시태그 저장 실패:", hashtagResponse);
          }
          alert("해시태그 저장에 실패했습니다.");
        }
      }

      if (titleChanged && hashtagsChanged) {
        alert("해시태그와 제목이 성공적으로 저장되었습니다!");
      } else if (titleChanged) {
        alert("노래 제목이 성공적으로 수정되었습니다!");
      } else if (hashtagsChanged) {
        alert("해시태그가 성공적으로 저장되었습니다!");
      } else {
        alert("변경사항 없이 성공적으로 저장되었습니다!");
      }

      navigate(`/user/${uid}/playlist`);
    } catch (error) {
      console.error(
        "노래 정보 저장 중 네트워크 오류 또는 예기치 않은 오류 발생:",
        error
      );
      alert("노래 정보 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSaveToPlaylist = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const postId = location.state?.postId;
      if (!postId) {
        alert("postId를 찾을 수 없습니다.");
        return;
      }

      // FastAPI에서 받은 데이터를 스프링 백엔드에 전송
      const springResponse = await axiosInstance.post(
        `/api/v1/music?postId=${postId}`,
        {
          musicUrl: musicUrl,
          title: title,
          emotion: emotion,
          // emotion1: emotion1,
          // emotion2: emotion2,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (springResponse.status === 200) {
        alert("노래가 플레이리스트에 성공적으로 저장되었습니다!");
        setIsDropdownVisible(true);
        setMusicId(springResponse.data.id);
      } else if (springResponse.data?.errorCode === "CE1") {
        console.error("엘라스틱서치 요청 실패");
        alert("엘라스틱서치 요청 실패로 노래 저장에 실패했습니다.");
      } else if (springResponse.data?.errorCode === "SP1") {
        console.error("게시물 없음");
        alert("해당 게시물이 존재하지 않습니다.");
      } else if (springResponse.data?.errorCode === "SA9") {
        console.error("사용자 정보 없음");
        alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      } else {
        console.error("노래 저장 실패:", springResponse);
        alert("노래 저장에 실패했습니다.");
      }
    } catch (error: any) {
      console.error(
        "노래 저장 중 네트워크 오류 또는 예기치 않은 오류 발생:",
        error
      );
      alert("노래 저장 중 오류가 발생했습니다.");
    }
  };

  // 노래가 끝났을 때 실행되는 핸들러
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 재생 버튼 클릭 핸들러
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    // 컴포넌트 마운트 시 자동 재생
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {}, [isDropdownVisible]);

  return (
    <S.Wrapper>
      <S.VideoBackground ref={videoRef} src={videoUrl} autoPlay muted loop />
      <S.TopLeftInfo>
        <S.InfoText>{nickname} 님의 감정으로 노래를 만들었어요.</S.InfoText>
        <S.BottomCenterText>
          하루를 마무리 하며, 센티플은 당신의 하루를 담은 감정도 분석해
          보았어요.
        </S.BottomCenterText>

        <EmotionDescription emotion={emotion} />
        {/* <EmotionDescription emotion={emotion1} />
        <EmotionDescription emotion={emotion2} /> */}
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
              * 생성한 음악을 내 플레이리스트에 저장 후 제목과 해시태그를
              설정하세요
            </S.BottomCenterText>
          </S.BottomLeftGroup>
          <S.BottomRightGroup>
            <S.BottomRightButton onClick={() => navigate(`/user/${uid}/blog`)}>
              내 블로그로 가기
            </S.BottomRightButton>
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
              <S.DropdownText>제목 및 장르</S.DropdownText>
              <S.DropdownSubText>
                * 제목을 수정해주세요 <br />* 장르는 최대 5개까지 선택
                가능합니다.
              </S.DropdownSubText>
              <S.LabelText>제목</S.LabelText>
              <S.TitleInput
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
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

            <S.RightButtonGroup>
              <S.SaveButton onClick={handleSaveButtonClick}>
                노래 정보 저장
              </S.SaveButton>
              <S.PlaylistButton
                onClick={() => navigate(`/user/${uid}/playlist`)}
              >
                플레이리스트 이동
              </S.PlaylistButton>
            </S.RightButtonGroup>
          </S.DropdownContainer>
        </CSSTransition>
      )}
    </S.Wrapper>
  );
};

export default SongResult;
export { EmotionDescription };

const emotionVideos: { [key: string]: string } = {
  행복: require("../../assets/videos/행복.mp4"),
  놀람: require("../../assets/videos/사랑.mp4"),
  혐오: require("../../assets/videos/불안.mp4"),
  분노: require("../../assets/videos/분노.mp4"),
  공포: require("../../assets/videos/우울.mp4"),
  슬픔: require("../../assets/videos/슬픔.mp4"),
  중립: require("../../assets/videos/중립.mp4"),
};

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

export const emotionColors: { [key: string]: string } = {
  행복: "#FFD700",
  놀람: "#FF1493",
  혐오: "#6A0DAD",
  분노: "#8B0000",
  공포: "#000080",
  슬픔: "#4169E1",
  중립: "#A9A9A9",
};

const emotionDescriptions: { [key: string]: string } = {
  행복: "강을 뒤덮은 밝고 노란 꽃밭",
  놀람: "하늘에서 피어난 커다란 폭죽",
  혐오: "어두운 숲속 안에 고여 있는 연못",
  분노: "마음속 요동치는 거친파도",
  공포: "얕게 흐르는 빛물에 꺼져가는 불꽃",
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
