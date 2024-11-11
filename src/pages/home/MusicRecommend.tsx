import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/MusicRecommend.style";
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [audioPlayers, setAudioPlayers] = useState<{
    [key: number]: HTMLAudioElement;
  }>({});

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
        setSongResults(response.data.content);
      }
    } catch (error) {
      console.error("Emotion-based search error:", error);
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
    setShouldAnimate(false);
    if (playingSongId !== null) {
      audioPlayers[playingSongId]?.pause();
      setPlayingSongId(null);
    }
  };

  const handlePlayPause = async (song: SongInfoResponse) => {
    const songId = song.musicId;

    console.log("Playing song URL:", song.musicUrl);

    if (playingSongId === songId) {
      audioPlayers[songId]?.pause();
      setPlayingSongId(null);
    } else {
      if (playingSongId !== null) {
        audioPlayers[playingSongId]?.pause();
      }

      let audio = audioPlayers[songId];
      if (!audio) {
        audio = new Audio(song.musicUrl);
        setAudioPlayers((prev) => ({ ...prev, [songId]: audio }));
      }

      try {
        await audio.play();
        setPlayingSongId(songId);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setDirection("prev");
      setPage((prev) => prev - 1);
      setShouldAnimate(true);
    }
  };

  const handleNextPage = () => {
    if (songResults.length === 3) {
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
                songResults.map((song, index) => (
                  <S.SongCard key={index}>
                    <S.PlayIconWrapper
                      onClick={() => handlePlayPause(song)}
                      emotion1={song.emotion1}
                      emotion2={song.emotion2}
                    >
                      <S.PlayIconCircle>
                        {playingSongId === song.musicId ? (
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
                    {/* <S.SaveToPlaylistButton>
                      MY PLAYLIST에 저장
                    </S.SaveToPlaylistButton> */}
                  </S.SongCard>
                ))
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
            <S.ArrowButton
              disabled={songResults.length < 3}
              onClick={handleNextPage}
            >
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
