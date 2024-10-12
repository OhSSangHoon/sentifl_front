import styled from "styled-components";

export const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
  background-color: #121212;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 180px;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 80px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #000000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarHeader = styled.h3`
  color: white;
  margin-bottom: 20px;
  background-color: #000000;
  text-align: center;
  width: 100%;
`;

export const Button = styled.button`
  background-color: rgba(217, 217, 217, 0.1);
  color: white;
  padding: 20px 20px;
  border: 0.1px solid #ffffff;
  border-radius: 30px;
  margin-bottom: 15px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgba(217, 217, 217, 0.2);
  }
`;

export const SongList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: hidden;
  background-color: #121212;
`;

export const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const PlayIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;

export const SongTitle = styled.div`
  color: white;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const SongDateAndDelete = styled.div`
  display: flex;
  align-items: center;
`;

export const SongDate = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-right: 10px;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    color: white;
  }

  &:active {
    color: white;
  }
`;

export const SongActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProducerName = styled.div`
  color: #aaa;
  font-size: 14px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export const AddButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;
export const LoadMoreButton = styled.button`
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

// export const HashTags = styled.div`
//   font-size: 12px;
//   color: #888;
//   margin-top: 5px;
// `;

export const HashTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const HashTagBubble = styled.span`
  background-color: #282828;
  color: white;
  padding: 8px 12px;
  border-radius: 25px;
  font-size: 12px;
  display: inline-block;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const TransparentInput = styled.input`
  width: 500px;
  opacity: 0.8;
  background-color: #121212;
  border: 0.2px solid gray;
  border-radius: 25px;
  color: white;
  padding: 5px;
  font-size: 14px;

  &:focus {
    opacity: 1;
  }
`;
