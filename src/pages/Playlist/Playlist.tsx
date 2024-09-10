import React from "react";
import styled from "styled-components";
import { FaPlay, FaPlus } from "react-icons/fa";

function Playlist() {
  return (
    <PlaylistContainer>
      <Sidebar>
        <SidebarHeader>MY PLAYLIST</SidebarHeader>
        <Button>재생목록 이름</Button>
        <Button>재생목록 이름</Button>
      </Sidebar>
      <SongList>
        <SongItem>
          <PlayIcon>
            <FaPlay size={14} color="#fff" />
          </PlayIcon>
          <SongDetails>
            <SongTitle>노래 제목</SongTitle>
            <SongDateAndDelete>
              <SongDate>2024.08.10</SongDate>
              <DeleteButton>삭제</DeleteButton>
            </SongDateAndDelete>
          </SongDetails>
          <SongActions>
            <ProducerName>제작자 이름</ProducerName>
            <Checkbox type="checkbox" />
            <AddButton>
              <FaPlus />
            </AddButton>
          </SongActions>
        </SongItem>
      </SongList>
    </PlaylistContainer>
  );
}

export default Playlist;

const PlaylistContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #121212;
  margin-top: 100px;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #000000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SidebarHeader = styled.h3`
  color: white;
  margin-bottom: 20px;
  background-color: #000000;
`;

const Button = styled.button`
  background-color: #383838;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #4a4a4a;
  }
`;

const SongList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: scroll;
  background-color: #121212;
`;

const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const PlayIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const SongDateAndDelete = styled.div`
  display: flex;
  align-items: center;
`;

const SongDate = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  font-size: 12px;
`;

const SongActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProducerName = styled.div`
  color: #aaa;
  font-size: 14px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;
