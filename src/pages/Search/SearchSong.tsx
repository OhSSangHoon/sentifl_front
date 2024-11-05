import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";
import Character4 from "../../assets/characters/Character_4.png";
import styled from "styled-components";

interface Song {
  musicId: number;
  postId: number;
  musicUrl: string;
  title: string;
  hashTags: string[];
  totalLikes: number;
  emotion1: string;
  emotion2: string;
  isLiked: boolean;
  uid: string;
}

function SearchSong() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("recent");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // URL에서 쿼리와 감정 파라미터 가져오기
  const query = new URLSearchParams(location.search).get("query") || "";
  const emotion = new URLSearchParams(location.search).get("emotion") || "";

  // 검색어 또는 감정에 따라 곡을 불러오는 함수
  const fetchSongs = async (isNewSearch = false) => {
    if (loading || (!hasMore && !isNewSearch)) return;

    setLoading(true);
    try {
      const endpoint = emotion
        ? `/api/v1/music/search/emotion`
        : `/api/v1/music/search/word`;

      const params = emotion
        ? { emotion, page: isNewSearch ? 0 : page, size: 10, filter }
        : { searchWord: query, page: isNewSearch ? 0 : page, size: 10, filter };

      console.log("Request Params:", params);
      const response = await axiosInstance.get(endpoint, { params });
      console.log("response:", response);

      if (response.status === 200) {
        const newSongs = response.data.content;
        setSongs(isNewSearch ? newSongs : [...songs, ...newSongs]);
        setPage(isNewSearch ? 1 : page + 1);
        setHasMore(!response.data.last);
      }
    } catch (error) {
      console.error("API 호출 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs(true);
  }, [query, emotion]);
  const handlePlayPause = (songId: number, musicUrl: string) => {
    if (audioRef.current) {
      if (currentSongId === songId) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.pause();
        audioRef.current.src = musicUrl;
        audioRef.current.play();
        setCurrentSongId(songId);
        setIsPlaying(true);
      }
    } else {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.play();
      setCurrentSongId(songId);
      setIsPlaying(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmotionSearch = searchTerm.startsWith("emotion:");
    const searchQuery = isEmotionSearch
      ? searchTerm.replace("emotion:", "")
      : searchTerm;

    // 감정 검색 또는 일반 키워드 검색에 따라 URL을 설정합니다.
    if (isEmotionSearch) {
      navigate(`/search-song?emotion=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/search-song?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Content>
      <SearchSongContainer>
        <SearchBarContainer>
          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색어를 입력하세요 (감정 검색은 'emotion:'으로 시작)"
            />
            <SearchButton type="submit">검색</SearchButton>
          </SearchForm>
        </SearchBarContainer>
      </SearchSongContainer>
      {loading ? (
        <LoadingState>노래를 불러오는 중입니다...</LoadingState>
      ) : songs.length > 0 ? (
        <SongList>
          {songs.map((song) => (
            <SongItem key={song.musicId}>
              <PlayIcon
                onClick={() => handlePlayPause(song.musicId, song.musicUrl)}
              >
                {currentSongId === song.musicId && isPlaying ? (
                  <FaPause size={14} color="#fff" />
                ) : (
                  <FaPlay size={14} color="#fff" />
                )}
              </PlayIcon>
              <SongDetails>
                <SongTitle>{song.title}</SongTitle>
                <HashTags>
                  {song.hashTags.map((tag, index) => (
                    <HashTagBubble key={index}>#{tag}</HashTagBubble>
                  ))}
                </HashTags>
                <SongDateAndDelete>
                  <LikeButton liked={song.isLiked}>
                    <FaHeart /> {song.totalLikes}
                  </LikeButton>
                </SongDateAndDelete>
              </SongDetails>
            </SongItem>
          ))}
        </SongList>
      ) : (
        <EmptyState>
          <CharacterImage src={Character4} alt="캐릭터 이미지" />
          <EmptyText>검색 결과가 없습니다.</EmptyText>
        </EmptyState>
      )}
    </Content>
  );
}

export default SearchSong;

const SearchSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  margin-top: 300px;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #000;
  display: flex;
  justify-content: center;
`;

const SearchForm = styled.form`
  display: flex;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: none;
  border-radius: 20px 0 0 20px;
  outline: none;
  background-color: #333;
  color: white;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #1db954;
  color: #fff;
  border-radius: 0 20px 20px 0;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const SongList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #121212;
`;

const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #333;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
`;

const PlayIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;

const SongTitle = styled.div`
  color: white;
  font-size: 16px;
  margin-bottom: 5px;
`;

const HashTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const HashTagBubble = styled.span`
  background-color: #282828;
  color: white;
  padding: 8px 12px;
  border-radius: 25px;
  font-size: 12px;
  display: inline-block;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SongDateAndDelete = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #aaa;
`;

const LikeButton = styled.button<{ liked: boolean }>`
  background: transparent;
  border: none;
  color: ${(props) => (props.liked ? "red" : "#aaa")};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: ${(props) => (props.liked ? "darkred" : "white")};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 20px;
`;

const CharacterImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #dbdbdb;
  margin-top: 10px;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: #777;
`;

const LoadMoreButton = styled.button`
  background-color: rgba(217, 217, 217, 0.1);
  color: white;
  border: 0.1px solid #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(217, 217, 217, 0.2);
  }
  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;
