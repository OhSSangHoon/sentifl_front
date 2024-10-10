import React, { useEffect, useRef, useState } from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk, FaPause } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useParams } from "react-router-dom";

interface Song {
  id: number;
  postId: number;
  musicUrl: string;
  title: string;
  hashTag: string;
  totalLikes: number;
  emotion1: string;
  emotion2: string;
  hashTags?: string[];
}

function Playlist() {
  const { uid } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  // lastId에 가장 큰 수 할당
  const [lastId, setLastId] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 가져올 데이터가 있는지 여부
  const [loading, setLoading] = useState<boolean>(false);

  // 재생 상태와 오디오 관리
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [editSongId, setEditSongId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedHashTag, setEditedHashTag] = useState<string>("");

  const fetchSongs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/v1/music/${uid}`, {
        params: {
          lastId: lastId,
          size: 10,
        },
      });

      if (response.status === 200) {
        const newSongs = response.data.content;

        // if (newSongs.length > 0) {
        //   setSongs((prevSongs) => [...prevSongs, ...newSongs]);
        //   setLastId(newSongs[newSongs.length - 1].id);
        // }

        if (newSongs.length > 0) {
          const songsWithHashTags = await Promise.all(
            newSongs.map(async (song: Song) => {
              const hashTags = await fetchHashTags(song.id);
              return { ...song, hashTags }; // 해시태그 추가
            })
          );
          setSongs((prevSongs) => [...prevSongs, ...songsWithHashTags]);
          setLastId(newSongs[newSongs.length - 1].id);
        }

        // 서버에서 반환된 last 값에 따라 처리
        if (response.data.last) {
          setHasMore(false);
        }
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("API 호출 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (songId: number) => {
    if (window.confirm("정말로 이 노래를 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(`/api/v1/music/${songId}`);

        if (response.status === 204) {
          setSongs((prevSongs) =>
            prevSongs.filter((song) => song.id !== songId)
          );

          alert("노래가 삭제되었습니다.");
        } else {
          alert("노래 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("노래 삭제 중 오류 발생:", error);
        alert("노래 삭제에 실패했습니다.");
      }
    }
  };

  const fetchHashTags = async (musicId: number) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/music/${musicId}/hashtag`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Failed to fetch hashtags for musicId: ${musicId}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching hashtags:", error);
      return [];
    }
  };

  // 노래 수정
  const handleSaveEdit = async (postId: number, song: Song) => {
    try {
      await axiosInstance.put(`/api/v1/music/post/${postId}`, {
        musicUrl: song.musicUrl,
        title: editedTitle,
        hashTag: editedHashTag,
        emotion1: song.emotion1,
        emotion2: song.emotion2,
      });
      setSongs((prevSongs) =>
        prevSongs.map((s) =>
          s.id === postId
            ? { ...s, title: editedTitle, hashTag: editedHashTag }
            : s
        )
      );
      setEditSongId(null);
    } catch (error) {
      console.error("노래 수정 중 오류 발생:", error);
    }
  };

  const handleEditClick = (song: Song) => {
    setEditSongId(song.id);
    setEditedTitle(song.title);
    setEditedHashTag(song.hashTag);
  };

  const handlePlayPause = (songId: number, musicUrl: string) => {
    if (audioRef.current) {
      // 같은 노래를 다시 클릭한 경우 재생/일시정지
      if (currentSongId === songId) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        // 다른 노래 클릭 시 새로운 노래 재생
        audioRef.current.pause();
        audioRef.current.src = musicUrl;
        audioRef.current.play();
        setCurrentSongId(songId);
        setIsPlaying(true);
      }
    } else {
      // 첫 재생 시
      audioRef.current = new Audio(musicUrl);
      audioRef.current.play();
      setCurrentSongId(songId);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <S.PlaylistContainer>
      <S.TopBar>
        <S.IconWrapper>
          <FaAsterisk size={18} color="#fff" />
        </S.IconWrapper>
      </S.TopBar>
      <S.Content>
        <S.Sidebar>
          <S.SidebarHeader>MY PLAYLIST</S.SidebarHeader>
          <S.Button>재생목록</S.Button>
        </S.Sidebar>
        <S.SongList>
          {songs.map((song) => (
            <S.SongItem key={song.id}>
              <S.PlayIcon
                onClick={() => handlePlayPause(song.id, song.musicUrl)}
              >
                {currentSongId === song.id && isPlaying ? (
                  <FaPause size={14} color="#fff" />
                ) : (
                  <FaPlay size={14} color="#fff" />
                )}
              </S.PlayIcon>
              <S.SongDetails>
                {editSongId === song.id ? (
                  <>
                    <S.TransparentInput
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <S.TransparentInput
                      type="text"
                      value={editedHashTag}
                      onChange={(e) => setEditedHashTag(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <S.SongTitle>{song.title}</S.SongTitle>
                    <S.HashTags>
                      {song.hashTags && song.hashTags.length > 0 ? (
                        song.hashTags.map((tag) => (
                          <span key={tag}>#{tag} </span>
                        ))
                      ) : (
                        <span>No hashtags</span>
                      )}
                    </S.HashTags>
                  </>
                )}
                <S.SongDateAndDelete>
                  <S.DeleteButton onClick={() => deleteSong(song.id)}>
                    삭제
                  </S.DeleteButton>
                  {editSongId === song.id ? (
                    <S.DeleteButton
                      onClick={() => handleSaveEdit(song.postId, song)}
                    >
                      저장
                    </S.DeleteButton>
                  ) : (
                    <S.DeleteButton onClick={() => handleEditClick(song)}>
                      수정
                    </S.DeleteButton>
                  )}
                </S.SongDateAndDelete>
              </S.SongDetails>
              <S.SongActions>
                <S.ProducerName>{uid}</S.ProducerName>
                <S.Checkbox type="checkbox" />
                <S.AddButton>
                  <FaPlus />
                </S.AddButton>
              </S.SongActions>
            </S.SongItem>
          ))}
        </S.SongList>
        {loading && <p>로딩 중...</p>}
      </S.Content>
      {hasMore && !loading && (
        <S.LoadMoreButton onClick={fetchSongs}>더 보기</S.LoadMoreButton>
      )}
    </S.PlaylistContainer>
  );
}

export default Playlist;
