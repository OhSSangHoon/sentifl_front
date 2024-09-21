import React, { useEffect, useState } from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useParams } from "react-router-dom";

function Playlist() {
  const { uid } = useParams();
  const [songs, setSongs] = useState<any[]>([]);
  // lastId에 가장 큰 수 할당
  const [lastId, setLastId] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 가져올 데이터가 있는지 여부
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSongs = async () => {
    if (loading || !hasMore) return;

    setLoading(true); // 로딩 시작
    try {
      const response = await axiosInstance.get(`/music/${uid}`, {
        params: {
          lastId: lastId,
          size: 10,
        },
      });

      console.log(response.data);
      const newSongs = response.data.content;

      if (newSongs.length > 0) {
        // 새로운 데이터를 기존 목록에 추가
        setSongs((prevSongs) => [...prevSongs, ...newSongs]);

        // 마지막 ID를 최신 song의 ID로 업데이트
        setLastId(newSongs[newSongs.length - 1].id);
      }

      // 서버에서 반환된 last 값에 따라 처리
      if (response.data.last) {
        setHasMore(false);
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
        const response = await axiosInstance.delete(`/music/${songId}`);

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
          <S.Button>재생목록 이름</S.Button>
        </S.Sidebar>
        <S.SongList>
          {songs.map((song) => (
            <S.SongItem key={song.id}>
              <S.PlayIcon>
                <FaPlay size={14} color="#fff" />
              </S.PlayIcon>
              <S.SongDetails>
                <S.SongTitle>{song.title}</S.SongTitle>
                <S.SongDateAndDelete>
                  <S.SongDate>yyyy.mm.dd</S.SongDate>
                  <S.DeleteButton onClick={() => deleteSong(song.id)}>
                    삭제
                  </S.DeleteButton>
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
