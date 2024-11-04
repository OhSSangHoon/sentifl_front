import React, { useEffect, useRef, useState } from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk, FaPause, FaHeart } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useNavigate, useParams } from "react-router-dom";
import Character4 from "../../assets/characters/Character_4.png";

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
}

function Playlist() {
  const { uid } = useParams();
  const [songs, setSongs] = useState<Song[]>([]);
  // lastId에 가장 큰 수 할당
  const [lastId, setLastId] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

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

        if (newSongs.length > 0) {
          const songsWithDetails = await Promise.all(
            newSongs.map(async (song: Song) => {
              // 해시태그 가져오기
              let hashTags: string[] = [];
              try {
                const hashTagResponse = await axiosInstance.get(
                  `/api/v1/music/${song.musicId}/hashtag`
                );
                if (hashTagResponse.status === 200) {
                  hashTags = hashTagResponse.data;
                } else if (hashTagResponse.data?.errorCode === "SM1") {
                  console.error(
                    `노래가 존재하지 않습니다 (musicId: ${song.musicId})`
                  );
                }
              } catch (error) {
                console.error(
                  `Error fetching hashtags for musicId: ${song.musicId}`,
                  error
                );
              }

              // 좋아요 상태 가져오기
              let isLiked = false;
              try {
                const likeResponse = await axiosInstance.get(
                  `/api/v1/music/${song.musicId}/like`
                );
                if (likeResponse.status === 200) {
                  isLiked = likeResponse.data.like;
                } else if (likeResponse.data?.errorCode === "SM4") {
                  console.error("음악 좋아요 기록 없음");
                } else {
                  console.error(
                    `Unexpected response status for like: ${likeResponse.status}`
                  );
                }
              } catch (error) {
                console.error(
                  `Error fetching like status for musicId: ${song.musicId}`,
                  error
                );
              }

              return { ...song, hashTags, isLiked };
            })
          );

          setSongs((prevSongs) => [...prevSongs, ...songsWithDetails]);
          setLastId(newSongs[newSongs.length - 1].musicId);
        }

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

  const handleLikeClick = async (song: Song) => {
    try {
      if (song.isLiked) {
        const response = await axiosInstance.delete(
          `/api/v1/music/${song.musicId}/like`
        );

        if (response.status === 204) {
          setSongs((prevSongs) =>
            prevSongs.map((s) =>
              s.musicId === song.musicId
                ? { ...s, isLiked: false, totalLikes: s.totalLikes - 1 }
                : s
            )
          );
        } else {
          const errorCode = response.data?.errorCode;
          if (errorCode === "SA9") {
            alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
          } else if (errorCode === "SM1") {
            alert("존재하지 않는 노래입니다.");
          } else if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else {
            console.error("좋아요 취소 중 알 수 없는 오류 발생:", response);
          }
        }
      } else {
        const response = await axiosInstance.post(
          `/api/v1/music/${song.musicId}/like`
        );
        if (response.status === 204) {
          setSongs((prevSongs) =>
            prevSongs.map((s) =>
              s.musicId === song.musicId
                ? { ...s, isLiked: true, totalLikes: s.totalLikes + 1 }
                : s
            )
          );
        } else {
          const errorCode = response.data?.errorCode;
          if (errorCode === "SA9") {
            alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
          } else if (errorCode === "SM1") {
            alert("존재하지 않는 노래입니다.");
          } else if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else {
            console.error("좋아요 취소 중 알 수 없는 오류 발생:", response);
          }
        }
      }
    } catch (error: any) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  const deleteSong = async (songId: number) => {
    if (window.confirm("정말로 이 노래를 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(`/api/v1/music/${songId}`);

        if (response.status === 204) {
          setSongs((prevSongs) =>
            prevSongs.filter((song) => song.musicId !== songId)
          );

          alert("노래가 삭제되었습니다.");
        } else {
          alert("노래 삭제에 실패했습니다.");
        }
      } catch (error: any) {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === "SM1") {
          alert("존재하지 않는 노래입니다.");
        } else {
          console.error("노래 삭제 중 오류 발생:", error);
          alert("노래 삭제에 실패했습니다.");
        }
      }
    }
  };

  // 노래 수정
  const handleSaveEdit = async (song: Song) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/music/post/${song.postId}`,
        {
          musicUrl: song.musicUrl,
          title: editedTitle,
          emotion1: song.emotion1,
          emotion2: song.emotion2,
        }
      );

      if (response.status === 204) {
        // 해시태그 수정
        const HashtagResponse = await axiosInstance.put(
          `/api/v1/music/${song.musicId}/hashtag`,
          {
            hashTag: editedHashTag,
          }
        );

        if (HashtagResponse.status === 204) {
          const updatedHashTags = editedHashTag.split(" ");
          setSongs((prevSongs) =>
            prevSongs.map((s) =>
              s.postId === song.postId
                ? { ...s, title: editedTitle, hashTags: updatedHashTags }
                : s
            )
          );
          setEditSongId(null);
        } else {
          const errorCode = HashtagResponse.data?.errorCode;
          if (errorCode === "SA9") {
            alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
          } else if (errorCode === "SM1") {
            alert("존재하지 않는 노래입니다.");
          } else if (errorCode === "CE1") {
            console.error("엘라스틱서치 요청 실패");
          } else {
            console.error("해시태그 수정 중 알 수 없는 오류 발생");
          }
        }
      } else {
        const errorCode = response.data?.errorCode;
        if (errorCode === "SP1") {
          alert("존재하지 않는 게시물입니다.");
        } else if (errorCode === "CE1") {
          console.error("엘라스틱서치 요청 실패");
        } else {
          console.error("노래 수정 중 알 수 없는 오류 발생");
        }
      }
    } catch (error) {
      console.error("노래 수정 중 오류 발생:", error);
    }
  };

  const handleEditClick = (song: Song) => {
    setEditSongId(song.musicId);
    setEditedTitle(song.title);
    setEditedHashTag(song.hashTags.join(" "));
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

  const navigate = useNavigate();
  const goToCreateSong = () => {
    navigate("/create-song");
  };

  return (
    <S.PlaylistContainer>
      <S.TopBar>
        <S.IconWrapper>
          <FaAsterisk size={18} onClick={goToCreateSong} />
        </S.IconWrapper>
      </S.TopBar>
      <S.Content>
        <S.Sidebar>
          <S.SidebarHeader>MY PLAYLIST</S.SidebarHeader>
          <S.Button>재생목록</S.Button>
        </S.Sidebar>
        <S.SongList>
          {loading ? (
            <S.LoadingState>노래를 불러오는 중입니다...</S.LoadingState>
          ) : songs.length > 0 ? (
            <S.SongList>
              {songs.map((song) => (
                <S.SongItem key={song.musicId}>
                  <S.PlayIcon
                    onClick={() => handlePlayPause(song.musicId, song.musicUrl)}
                  >
                    {currentSongId === song.musicId && isPlaying ? (
                      <FaPause size={14} color="#fff" />
                    ) : (
                      <FaPlay size={14} color="#fff" />
                    )}
                  </S.PlayIcon>
                  <S.SongDetails>
                    {editSongId === song.musicId ? (
                      <>
                        <S.TransparentInput
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          placeholder="제목을 입력하세요"
                        />
                        <S.TransparentInput
                          type="text"
                          value={editedHashTag}
                          onChange={(e) => setEditedHashTag(e.target.value)}
                          placeholder="해시태그를 공백으로 구분하여 입력하세요"
                        />
                      </>
                    ) : (
                      <>
                        <S.SongTitle>{song.title}</S.SongTitle>
                        <S.HashTags>
                          {song.hashTags && song.hashTags.length > 0 ? (
                            song.hashTags.map((tag, index) => (
                              <S.HashTagBubble key={index}>
                                #{tag}
                              </S.HashTagBubble>
                            ))
                          ) : (
                            <span
                              style={{ color: "#dbdbdb", fontSize: "10px" }}
                            >
                              해시태그가 없습니다
                            </span>
                          )}
                        </S.HashTags>
                      </>
                    )}
                    <S.SongDateAndDelete>
                      <S.DeleteButton onClick={() => deleteSong(song.musicId)}>
                        삭제
                      </S.DeleteButton>
                      {editSongId === song.musicId ? (
                        <S.DeleteButton onClick={() => handleSaveEdit(song)}>
                          저장
                        </S.DeleteButton>
                      ) : (
                        <S.DeleteButton onClick={() => handleEditClick(song)}>
                          수정
                        </S.DeleteButton>
                      )}
                      <S.LikeButton
                        liked={song.isLiked}
                        onClick={() => handleLikeClick(song)}
                      >
                        <FaHeart /> {song.totalLikes}
                      </S.LikeButton>
                    </S.SongDateAndDelete>
                  </S.SongDetails>
                  <S.SongActions>
                    <S.ProducerName>{uid}</S.ProducerName>
                  </S.SongActions>
                </S.SongItem>
              ))}
            </S.SongList>
          ) : (
            <S.EmptyState>
              <S.CharacterImage src={Character4} alt="캐릭터 이미지" />
              <S.EmptyText>
                다양한 음악들로 나만의 플레이리스트를 만들어보세요.
              </S.EmptyText>
            </S.EmptyState>
          )}
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
