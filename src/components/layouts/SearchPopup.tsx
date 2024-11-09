import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/SearchPopup.style";

interface SongInfoResponse {
  musicId: number;
  title: string;
  emotion1: string;
  emotion2: string;
  totalLikes: number;
  userNickname: string;
  createTime: string;
}

export interface PostInfoResponse {
  uid: string;
  id: number;
  title: string;
  createDate: string;
  totalLikes: number;
  thumbnailUrl: string;
}

interface SearchPopupProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
}

const emotions = ["행복", "사랑", "불안", "분노", "우울", "슬픔", "중립"];

const SearchPopup: React.FC<SearchPopupProps> = ({
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const { uid } = useAuth();

  const [postResults, setPostResults] = useState<PostInfoResponse[]>([]);
  const [songResults, setSongResults] = useState<SongInfoResponse[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const [filter, setFilter] = useState("recent");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setSearchQuery("");
      onClose();
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const handlePostSearch = async () => {
    try {
      const postSearchResponse = await axiosInstance.get(
        "/api/v1/post/search/word",
        {
          params: {
            searchWord: searchQuery,
            page,
            size,
            filter,
          },
        }
      );

      if (postSearchResponse.status === 200) {
        setPostResults(postSearchResponse.data.content);
      }
    } catch (error) {
      console.error("게시물 검색 에러", error);
    }
  };

  const filteredPostResults =
    postResults.length > 0
      ? postResults.filter((post) => post.title.includes(searchQuery))
      : [];

  const handleSongSearch = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/music/search/word", {
        params: {
          searchWord: searchQuery,
          page,
          size,
          filter,
        },
      });
      if (response.status === 200) {
        setSongResults(response.data.content);
      } else {
        console.error("노래 검색 실패: 상태 코드", response.status);
      }
    } catch (error) {
      console.error("노래 검색 에러:", error);
    }
  };

  const handleEmotionClick = async (emotion: string) => {
    if (selectedEmotion === emotion) {
      setSelectedEmotion(null);
      setSongResults([]);
      return;
    }

    setSelectedEmotion(emotion);
    setSearchQuery("");
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/v1/music/search/emotion", {
        params: {
          emotion,
          page,
          size,
          filter,
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

  const filteredSongResults =
    songResults.length > 0
      ? songResults.filter((song) => song.title.includes(searchQuery))
      : [];

  const getEmotionColorGradient = (emotion: string) => {
    const emotionColors: { [key: string]: string } = {
      행복: "#FFD700",
      사랑: "#FF1493",
      불안: "#6A0DAD",
      분노: "#8B0000",
      우울: "#000080",
      슬픔: "#4169E1",
      중립: "#A9A9A9",
    };
    const color = emotionColors[emotion] || "#A9A9A9";
    return `linear-gradient(to bottom, ${color} 0%, #000000 100%)`;
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      handlePostSearch();
      handleSongSearch();
    } else {
      setSongResults([]);
      setPostResults([]);
    }
  }, [searchQuery, filter, page, size]);

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.SearchPopupContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.SearchInputWrapper>
          <S.SearchIcon />
          <S.SearchInput
            placeholder="검색어를 입력해 주세요."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setSelectedEmotion(null);
            }}
          />
        </S.SearchInputWrapper>

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

        <S.SearchResultsContainer>
          <S.PostResultsContainer>
            <h3>게시글</h3>
            <S.FilterSelectWrapper>
              <S.FilterSelect
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">최신순</option>
                <option value="like">좋아요 많은 순</option>
                <option value="view">조회수 순</option>
              </S.FilterSelect>
            </S.FilterSelectWrapper>

            {filteredPostResults.length > 0 ? (
              filteredPostResults.map((post) => (
                <S.SearchResultItem key={post.id}>
                  <S.PostLink
                    to={`/user/${post.uid}/post/${post.id}`}
                    onClick={handleClose}
                  >
                    <span>{post.title}</span>
                  </S.PostLink>{" "}
                </S.SearchResultItem>
              ))
            ) : (
              <S.NoResults>게시글 결과가 없습니다.</S.NoResults>
            )}
          </S.PostResultsContainer>

          <S.SongResultsContainer>
            <h3>노래</h3>
            <S.FilterSelectWrapper>
              <S.FilterSelect
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="recent">최신순</option>
                <option value="like">좋아요 많은 순</option>
              </S.FilterSelect>
            </S.FilterSelectWrapper>
            {loading ? (
              <S.LoadingMessage>
                해당 감정에 대한 노래를 찾고 있습니다...
              </S.LoadingMessage>
            ) : filteredSongResults.length > 0 ? (
              filteredSongResults.map((song) => (
                <S.SearchResultItem key={song.musicId}>
                  <S.UserLink to={`/user/${uid}/playlist`} onClick={onClose}>
                    <S.EmotionCircle
                      color={getEmotionColorGradient(song.emotion1)}
                    />
                    <span>{song.title}</span>
                  </S.UserLink>
                  <S.UserNickname>{song.userNickname}</S.UserNickname>
                </S.SearchResultItem>
              ))
            ) : (
              <S.NoResults>노래 결과가 없습니다.</S.NoResults>
            )}
          </S.SongResultsContainer>
        </S.SearchResultsContainer>
      </S.SearchPopupContainer>
    </S.PopupOverlay>
  );
};

export default SearchPopup;
