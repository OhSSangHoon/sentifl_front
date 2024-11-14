import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/SearchPopup.style";

interface SongInfoResponse {
  musicId: number;
  title: string;
  emotion1: string;
  emotion2: string;
  totalLikes: number;
  uid: string;
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
  content: string;
  hashtag: string;
}

interface SearchPopupProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
}

const emotions = ["공포", "놀람", "분노", "슬픔", "중립", "행복", "혐오"];

const SearchPopup: React.FC<SearchPopupProps> = ({
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const { uid } = useAuth();

  const [postResults, setPostResults] = useState<PostInfoResponse[]>([]);
  const [songResults, setSongResults] = useState<SongInfoResponse[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const [postFilter, setPostFilter] = useState("recent");
  const [songFilter, setSongFilter] = useState("recent");
  const [postPage, setPostPage] = useState(0);
  const [songPage, setSongPage] = useState(0);
  const [postSize, setPostSize] = useState(10);
  const [songSize, setSongSize] = useState(10);

  const [postIsLastPage, setPostIsLastPage] = useState(false);
  const [songIsLastPage, setSongIsLastPage] = useState(false);

  const [loading, setLoading] = useState(false);

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
            page: postPage,
            size: postSize,
            filter: postFilter,
          },
        }
      );

      if (postSearchResponse.status === 200) {
        const postResults = postSearchResponse.data.content;
        setPostResults(postResults);
        setPostIsLastPage(postSearchResponse.data.last);
      } else {
        const errorCode = postSearchResponse.data?.errorCode;
        if (errorCode === "CE1") {
          console.log("엘라스틱서치 요청 실패");
        }
      }
    } catch (error) {
      console.error("게시물 검색 에러", error);
    }
  };

  const filteredPostResults =
    postResults.length > 0
      ? postResults.filter(
          (post) =>
            post.title.includes(searchQuery) ||
            post.content.includes(searchQuery) ||
            post.hashtag.includes(searchQuery)
        )
      : [];

  const handleSongSearch = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/music/search/word", {
        params: {
          searchWord: searchQuery,
          page: songPage,
          size: songSize,
          filter: songFilter,
        },
      });
      if (response.status === 200) {
        setSongResults(response.data.content);
        setSongIsLastPage(response.data.last);
      } else {
        console.error("노래 검색 실패: 상태 코드", response.status);
      }
    } catch (error) {
      console.error("노래 검색 에러:", error);
    }
  };

  const fetchEmotionSongs = async (emotion: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/music/search/emotion", {
        params: {
          emotion,
          page: songPage,
          size: songSize,
          filter: songFilter,
        },
      });
      if (response.status === 200) {
        setSongResults(response.data.content);
        setSongIsLastPage(response.data.last);
      }
    } catch (error) {
      console.error("Emotion-based search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmotionClick = async (emotion: string) => {
    if (selectedEmotion === emotion) {
      setSelectedEmotion(null);
      setSearchQuery("");
      setPostResults([]);
      setSongResults([]);
      return;
    }

    setSelectedEmotion(emotion);
    const hashtagQuery = `${emotion}`;
    setSearchQuery(hashtagQuery);
    setPostPage(0);
    setSongPage(0);

    try {
      await handlePostSearch();
      await handleSongSearch();
    } catch (error) {
      console.error("Emotion-based search error:", error);
    }
  };

  const filteredSongResults =
    songResults.length > 0
      ? songResults.filter((song) => song.title.includes(searchQuery))
      : [];

  const getEmotionColorGradient = (emotion: string) => {
    const emotionColors: { [key: string]: string } = {
      행복: "#FFD700",
      놀람: "#FF1493",
      혐오: "#6A0DAD",
      분노: "#8B0000",
      공포: "#000080",
      슬픔: "#4169E1",
      중립: "#A9A9A9",
    };
    const color = emotionColors[emotion] || "#A9A9A9";
    return `linear-gradient(to bottom, ${color} 0%, #000000 100%)`;
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      handlePostSearch();
    } else {
      setPostResults([]);
    }
  }, [searchQuery, postFilter, postPage]);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSongSearch();
    } else {
      setSongResults([]);
    }
  }, [searchQuery, songFilter, songPage]);

  useEffect(() => {
    if (selectedEmotion) {
      fetchEmotionSongs(selectedEmotion);
    }
  }, [selectedEmotion, songFilter, songPage]);

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
              setPostPage(0);
              setSongPage(0);
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
            <S.FilterRow>
              <S.ArrowContainer>
                <S.LeftArrow
                  onClick={() => setPostPage(postPage - 1)}
                  disabled={postPage === 0}
                />
                <S.RightArrow
                  onClick={() => setPostPage(postPage + 1)}
                  disabled={postIsLastPage || postResults.length === 0}
                />
              </S.ArrowContainer>
              <S.FilterSelectWrapper>
                <S.FilterSelect
                  value={postFilter}
                  onChange={(e) => {
                    setPostFilter(e.target.value);
                    setPostPage(0);
                  }}
                >
                  <option value="recent">최신순</option>
                  <option value="like">좋아요 많은 순</option>
                  <option value="view">조회수 순</option>
                </S.FilterSelect>
              </S.FilterSelectWrapper>
            </S.FilterRow>

            {filteredPostResults.length > 0 ? (
              filteredPostResults.map((post) => (
                <S.SearchResultItem key={post.id}>
                  <S.PostLink
                    to={`/user/${uid}/post/${post.id}`}
                    onClick={handleClose}
                  >
                    <span>{post.title}</span>
                  </S.PostLink>
                  <span>{post.uid}</span>
                </S.SearchResultItem>
              ))
            ) : (
              <S.NoResults>게시글 결과가 없습니다.</S.NoResults>
            )}
          </S.PostResultsContainer>

          <S.SongResultsContainer>
            <h3>노래</h3>
            <S.FilterRow>
              <S.ArrowContainer>
                <S.LeftArrow
                  onClick={() => setSongPage(songPage - 1)}
                  disabled={songPage === 0}
                />
                <S.RightArrow
                  onClick={() => setSongPage(songPage + 1)}
                  disabled={songIsLastPage || songResults.length === 0}
                />
              </S.ArrowContainer>
              <S.FilterSelectWrapper>
                <S.FilterSelect
                  value={songFilter}
                  onChange={(e) => {
                    setSongFilter(e.target.value);
                    setSongPage(0);
                  }}
                >
                  <option value="recent">최신순</option>
                  <option value="like">좋아요 많은 순</option>
                </S.FilterSelect>
              </S.FilterSelectWrapper>
            </S.FilterRow>
            {loading ? (
              <S.LoadingMessage>
                해당 감정에 대한 노래를 찾고 있습니다...
              </S.LoadingMessage>
            ) : filteredSongResults.length > 0 ? (
              filteredSongResults.map((song) => (
                <S.SearchResultItem key={song.musicId}>
                  <S.UserLink
                    to={`/user/${song.uid}/playlist`}
                    onClick={() => {
                      console.log("Clicked song.uid:", song.uid);
                      onClose();
                    }}
                  >
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
