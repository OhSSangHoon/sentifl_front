import React, { useEffect } from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useParams } from "react-router-dom";

function Playlist() {
  const { uid } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axiosInstance.get(`/music/${uid}`, {
          params: {
            lastId: 1,
            size: 10,
          },
        });

        console.log("API 응답 성공:", response.data);
      } catch (error: any) {
        if (error.response) {
          console.error(
            "API 호출 중 오류 발생: 상태 코드",
            error.response.status,
            "응답 데이터:",
            error.response.data
          );
        } else if (error.request) {
          console.error(
            "서버로부터 응답이 없습니다. 요청 정보:",
            error.request
          );
        } else {
          console.error("API 호출 중 예기치 못한 오류 발생:", error.message);
        }
      }
    };

    fetchSongs();
  }, [uid]);

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
          <S.SongItem>
            <S.PlayIcon>
              <FaPlay size={14} color="#fff" />
            </S.PlayIcon>
            <S.SongDetails>
              <S.SongTitle>노래 제목</S.SongTitle>
              <S.SongDateAndDelete>
                <S.SongDate>2024.08.10</S.SongDate>
                <S.DeleteButton>삭제</S.DeleteButton>
              </S.SongDateAndDelete>
            </S.SongDetails>
            <S.SongActions>
              <S.ProducerName>제작자 이름</S.ProducerName>
              <S.Checkbox type="checkbox" />
              <S.AddButton>
                <FaPlus />
              </S.AddButton>
            </S.SongActions>
          </S.SongItem>
        </S.SongList>
      </S.Content>
    </S.PlaylistContainer>
  );
}

export default Playlist;
