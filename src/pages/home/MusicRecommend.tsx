import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/MusicRecommend.style";

interface SongInfoResponse {
  musicId: number;
  title: string;
  emotion1: string;
  emotion2: string;
  totalLikes: number;
  uid: string;
  userNickname: string;
  createTime: string;
  musicUrl: string;
}

const emotions = ["행복", "사랑", "불안", "분노", "우울", "슬픔", "중립"];

function MusicRecommend() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("행복");
  const [songResults, setSongResults] = useState<SongInfoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMoreSongs, setHasMoreSongs] = useState<boolean>(true);

  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [currentSongKey, setCurrentSongKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const fetchEmotionSongs = async (emotion: string, pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/music/search/emotion", {
        params: {
          emotion,
          page: pageNumber,
          size: 3,
          filter: "like",
        },
      });
      if (response.status === 200) {
        setSongResults(response.data.content || []);
        setHasMoreSongs(!response.data.last);
        // console.log(response.data);
      }else{
        setSongResults([]);
      }
    } catch (error) {
      console.error("Emotion-based search error:", error);
      setSongResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmotionSongs(selectedEmotion, page);
  }, [selectedEmotion, page]);

  const handleEmotionClick = (emotion: string) => {
    setSelectedEmotion(emotion);
    setPage(0);
    setHasMoreSongs(true);
    setShouldAnimate(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setCurrentSongKey(null);
    setIsPlaying(false);
  };

  const handlePlayPause = async (song: SongInfoResponse, songKey: string) => {
    if (audioRef.current) {
      if (currentSongKey === songKey) {
        if (isPlaying) {
          try {
            audioRef.current.pause();
            setIsPlaying(false);
          } catch (error) {
            console.error("일시 정지 중 오류 발생:", error);
          }
        } else {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("재생 중 오류 발생:", error);
          }
        }
      } else {
        audioRef.current.pause();
        audioRef.current = new Audio(song.musicUrl);
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };

        audioRef.current.onloadeddata = async () => {
          try {
            await audioRef.current!.play();
            setCurrentSongKey(songKey);
            setIsPlaying(true);
          } catch (error) {
            console.error("재생 중 오류 발생:", error);
          }
        };
      }
    } else {
      audioRef.current = new Audio(song.musicUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current.onloadeddata = async () => {
        try {
          await audioRef.current!.play();
          setCurrentSongKey(songKey);
          setIsPlaying(true);
        } catch (error) {
          console.error("재생 중 오류 발생:", error);
        }
      };
      audioRef.current.load();
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try{
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        } catch (error){
          console.error("오디오 정지 중 오류 발생:", error);
        }
      }
    };
  }, []);

  const handlePrevPage = () => {
    if (page > 0) {
      setDirection("prev");
      setPage((prev) => prev - 1);
      setShouldAnimate(true);
    }
  };

  const handleNextPage = () => {
    if (hasMoreSongs) {
      setDirection("next");
      setPage((prev) => prev + 1);
      setShouldAnimate(true);
    }
  };

  return (
    <S.Container>
      <S.Title>Sentifl Keyword</S.Title>
      <S.Subtitle>감정별 카테고리를 통해 인기음악을 추천해드려요</S.Subtitle>

      <S.EmotionButtonContainer>
        {emotions.map((emotion) => (
          <S.EmotionButton
            key={emotion}
            isSelected={selectedEmotion === emotion}
            emotion={emotion}
            onClick={() => handleEmotionClick(emotion)}
          >
            {emotion}
          </S.EmotionButton>
        ))}
      </S.EmotionButtonContainer>

      {loading ? (
        <S.LoadingMessage>노래를 찾고 있습니다...</S.LoadingMessage>
      ) : (
        <>
          <S.SongCarousel>
            <S.ArrowButton disabled={page === 0} onClick={handlePrevPage}>
              <FaChevronLeft />
            </S.ArrowButton>
            <S.SongList direction={direction} shouldAnimate={shouldAnimate}>
              {songResults.length > 0 ? (
                songResults.map((song, index) => {
                  const songKey = `${song.musicId}-${index}`;
                  return (
                    <S.SongCard key={songKey}>
                      <S.PlayIconWrapper
                        onClick={() => handlePlayPause(song, songKey)}
                        emotion1={song.emotion1}
                        emotion2={song.emotion2}
                      >
                        <S.PlayIconCircle>
                          {currentSongKey === songKey && isPlaying ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                        </S.PlayIconCircle>
                      </S.PlayIconWrapper>
                      <S.SongTitle longText={song.title.length > 20}>
                        {song.title}
                      </S.SongTitle>
                      <S.UserNickname>{song.userNickname}</S.UserNickname>
                    </S.SongCard>
                  );
                })
              ) : (
                <>
                  {[...Array(3)].map((_, index) => (
                    <S.EmptySongCard key={index}>
                      <S.PlayIconWrapper emotion1="중립" emotion2="중립">
                        <S.PlayIconCircle>
                          <FaPlay />
                        </S.PlayIconCircle>
                      </S.PlayIconWrapper>
                      <S.SongTitle longText={false}></S.SongTitle>
                      <S.UserNickname></S.UserNickname>
                    </S.EmptySongCard>
                  ))}
                </>
              )}
            </S.SongList>
            <S.ArrowButton disabled={!hasMoreSongs} onClick={handleNextPage}>
              <FaChevronRight />
            </S.ArrowButton>
          </S.SongCarousel>
          {songResults.length === 0 && (
            <S.NoSongsMessage>
              해당 감정에 대한 노래가 없습니다. 다른 감정을 선택해보세요.
            </S.NoSongsMessage>
          )}
        </>
      )}
    </S.Container>
  );
}

export default MusicRecommend;
