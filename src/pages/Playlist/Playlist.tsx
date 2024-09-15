import React from "react";
import * as S from "./Styles/Playlist.style";
import { FaPlay, FaPlus, FaAsterisk } from "react-icons/fa";

function Playlist() {
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
