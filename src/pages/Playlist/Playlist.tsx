import React, { useEffect } from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk } from "react-icons/fa";
import axiosInstance from "../../axiosInterceptor";
import { useParams } from "react-router-dom";

function Playlist() {
  const { uid } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/music/${uid}`, {
  //         params: {
  //           lastId: 1,
  //           size: 10,
  //         },
  //       });
  //       console.log("응답 데이터:", response.data);
  //     } catch (error: any) {
  //       if (error.response) {
  //         // 서버에서의 에러 메시지 확인
  //         console.error("서버 에러:", error.response.data);
  //         alert(`서버에서 에러가 발생했습니다: ${error.response.data.error}`);
  //       } else if (error.request) {
  //         // 요청이 서버에 도달하지 못했을 때
  //         console.error("요청 에러:", error.request);
  //         alert("서버에 연결할 수 없습니다.");
  //       } else {
  //         // 기타 에러
  //         console.error("오류:", error.message);
  //         alert("예상치 못한 오류가 발생했습니다.");
  //       }
  //     }
  //   };

  //   fetchData();
  // });

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
