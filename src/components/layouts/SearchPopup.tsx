import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/SearchPopup.style";

interface UserInfoResponse {
  id: number;
  uid: string;
  nickName: string;
  profile: string;
  isFollowing: boolean;
}

interface SongInfoResponse {
  musicId: number;
  title: string;
  emotion1: string;
  emotion2: string;
  totalLikes: number;
  userNickname: string;
  createTime: string;
}

interface SearchPopupProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClose: () => void;
}
const SearchPopup: React.FC<SearchPopupProps> = ({
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const { isLoggedIn, nickname, logout, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<UserInfoResponse[]>([]);
  const [postResults, setPostResults] = useState<any[]>([]);
  const [songResults, setSongResults] = useState<SongInfoResponse[]>([]);
  const [filter, setFilter] = useState("recent");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // 한 페이지당 글 개수 기본값
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

  useEffect(() => {
    if (isLoggedIn && uid) {
      fetchFollowList();
    }
  }, [isLoggedIn, uid]);

  const fetchFollowList = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/follow/${uid}`);
      if (response.status === 200) {
        // 로그인한 사용자가 팔로우한 UID 목록 추출
        const followedUids = response.data.content.map(
          (user: UserInfoResponse) => user.uid.trim()
        );
        // 검색 결과가 있을 경우, 팔로우 상태 업데이트
        setSearchResults((prevResults) =>
          prevResults.map((user) => ({
            ...user,
            isFollowing: followedUids.includes(user.uid.trim()), // 팔로우한 UID에 포함되면 true, 아니면 false
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching follow list:", error);
    }
  };

  // 팔로우
  const handleFollow = async (uid: string) => {
    try {
      const response = await axiosInstance.post("/api/v1/follow", { uid });
      if (response.status === 200 || response.status === 204) {
        // 클릭한 사용자만 상태 변경
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.uid === uid ? { ...user, isFollowing: true } : user
          )
        );
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // 언팔로우
  const handleUnfollow = async (uid: string) => {
    try {
      const response = await axiosInstance.delete("/api/v1/follow", {
        data: { uid },
      });
      if (response.status === 200 || response.status === 204) {
        // 클릭한 사용자만 상태 변경
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.uid === uid ? { ...user, isFollowing: false } : user
          )
        );
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleFollowToggle = (uid: string, isFollowing: boolean) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (isFollowing) {
      handleUnfollow(uid);
    } else {
      handleFollow(uid);
    }
  };

  //게시물 겁색 API 호출
  const handlePostSearch = async () => {
    try {
      // console.log({
      //   searchWord: searchQuery,
      //   page,
      //   size,
      //   filter,
      // });

      const postSearchResponse = await axiosInstance.get(
        "/api/v1/post/search/word",
        {
          params: {
            searchWord: searchQuery,
            page,
            size,
            filter,
          },
<<<<<<< HEAD
        });

        if(postSearchResponse.status === 200){
          const postResults = postSearchResponse.data.content;
          // console.log("Full post search response:", postSearchResponse.data);
          console.log("Received post search results:", postResults); // 응답 데이터 확인
          setPostResults(postResults);
=======
>>>>>>> develop
        }
      );

      if (postSearchResponse.status === 200) {
        const postResults = postSearchResponse.data.content;
        // console.log("Full post search response:", postSearchResponse.data);
        // console.log("Received post search results:", postResults); // 응답 데이터 확인
        setPostResults(postResults);
      }
    } catch (error) {
      console.error("게시물 검색 에러", error);
    }
  };

  const filteredPostResults =
    postResults.length > 0
      ? postResults.filter((post) => post.title.includes(searchQuery))
      : [];

  // 사용자 검색 API 호출
  const handleUserSearch = async (query: string) => {
    try {
      // 로그인한 경우 팔로우 정보를 함께 가져오기
      const searchResponse = await axiosInstance.get(
        "/api/v1/auth/user/search",
        {
          params: { keyword: query, lastId: 0 },
        }
      );

      if (searchResponse.status === 200) {
        let searchResults = searchResponse.data;

        // 로그인한 경우, 자기 자신을 제외한 사용자만 필터링
        if (isLoggedIn && uid) {
          searchResults = searchResults.filter(
            (user: UserInfoResponse) => user.uid !== uid
          );

          // 로그인한 사용자의 팔로우 정보 가져오기
          const followResponse = await axiosInstance.get(
            `/api/v1/follow/${uid}`
          );
          if (followResponse.status === 200) {
            const followedUids = followResponse.data.content.map(
              (user: UserInfoResponse) => user.uid.trim()
            );

            // 검색 결과에 팔로우 상태를 업데이트
            searchResults = searchResults.map((user: UserInfoResponse) => ({
              ...user,
              isFollowing: followedUids.includes(user.uid.trim()), // 팔로우한 UID에 포함되면 true, 아니면 false
            }));
          }
        } else {
          // 로그인하지 않은 경우, 모든 사용자 검색 결과 반환 (팔로우 상태는 무시)
          searchResults = searchResults.map((user: UserInfoResponse) => ({
            ...user,
            isFollowing: false,
          }));
        }

        setSearchResults(searchResults);
      }
    } catch (error) {
      console.error("Error fetching users or follow list:", error);
    }
  };

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

  // const handleUserClick = (userUid: string) => {
  //   navigate(`/user/${userUid}/blog`);
  //   setSearchQuery('');
  //   onClose;
  // }

  // 검색어 변경 시 호출
  useEffect(() => {
    if (searchQuery.trim()) {
      handleUserSearch(searchQuery);
      handlePostSearch();
      handleSongSearch();
    } else {
      setSongResults([]);
      setSearchResults([]);
      setPostResults([]);
    }
  }, [searchQuery, filter, page, size]);

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.SearchPopupContainer>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.SearchInput
          placeholder="검색어를 입력해 주세요."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        {/* 필터 선택 */}
        {/* <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="recent">최신순</option>
        <option value="like">좋아요 많은 순</option>
        <option value="view">조회수 순</option>
      </select>

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>이전 페이지</button>
      <button onClick={() => setPage((prev) => prev + 1)}>다음 페이지</button>
       */}
        {searchResults.length > 0 && (
          <S.SearchResults>
            {searchResults.map((user) => (
              <S.SearchResultItem key={user.id}>
                <S.UserLink to={`/user/${user.uid}/blog`} onClick={handleClose}>
                  <img
                    src={user.profile || "/default-profile.png"}
                    alt={user.nickName}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <span>{user.nickName}</span>
                </S.UserLink>
                <S.FollowButton
                  onClick={() => handleFollowToggle(user.uid, user.isFollowing)}
                  disabled={false}
                  isFollowing={user.isFollowing}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </S.FollowButton>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
        {filteredPostResults.length > 0 && (
<<<<<<< HEAD
        <S.SearchResults>
          {filteredPostResults.map((post) => (
            <S.SearchResultItem key={post.id}>
              {/* 추후에 elastic search 완성 후 uid를 post.uid로 바꿔야함 */}
              <S.PostLink to={`/user/${uid}/post/${post.id}`} onClick={handleClose}>
                <span>{post.title}</span>
              </S.PostLink>
            </S.SearchResultItem>
          ))}
        </S.SearchResults>
      )}
=======
          <S.SearchResults>
            {filteredPostResults.map((post) => (
              <S.SearchResultItem key={post.id}>
                <S.PostLink
                  to={`/user/${post.uid}/post/${post.id}`}
                  onClick={handleClose}
                >
                  <span>{post.title}</span>
                </S.PostLink>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
        {songResults.length > 0 && (
          <S.SearchResults>
            {songResults.map((song) => (
              <S.SearchResultItem key={song.musicId}>
                <S.UserLink to={`/user/${uid}/playlist`} onClick={onClose}>
                  <S.EmotionCircle
                    color={getEmotionColorGradient(song.emotion1)}
                  />
                  <span>{song.title}</span>
                </S.UserLink>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
>>>>>>> develop
      </S.SearchPopupContainer>
    </S.PopupOverlay>
  );
};

export default SearchPopup;
