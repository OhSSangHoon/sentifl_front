import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./SearchSong.style";
import { FaHeart } from "react-icons/fa";

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

const SearchSong: React.FC<SearchPopupProps> = ({
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const { isLoggedIn, uid } = useAuth();
  const [searchResults, setSearchResults] = useState<UserInfoResponse[]>([]);
  const [postResults, setPostResults] = useState<any[]>([]);
  const [songResults, setSongResults] = useState<SongInfoResponse[]>([]);
  const [filter, setFilter] = useState("recent");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        const followedUids = response.data.content.map(
          (user: UserInfoResponse) => user.uid.trim()
        );
        setSearchResults((prevResults) =>
          prevResults.map((user) => ({
            ...user,
            isFollowing: followedUids.includes(user.uid.trim()),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching follow list:", error);
    }
  };

  const handleFollowToggle = (uid: string, isFollowing: boolean) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    isFollowing ? handleUnfollow(uid) : handleFollow(uid);
  };

  const handleFollow = async (uid: string) => {
    try {
      const response = await axiosInstance.post("/api/v1/follow", { uid });
      if (response.status === 200 || response.status === 204) {
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

  const handleUnfollow = async (uid: string) => {
    try {
      const response = await axiosInstance.delete("/api/v1/follow", {
        data: { uid },
      });
      if (response.status === 200 || response.status === 204) {
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

  const handleSongSearch = async () => {
    try {
      console.log("검색 파라미터:", {
        searchWord: searchQuery,
        page,
        size,
        filter,
      }); // 파라미터 확인
      const songSearchResponse = await axiosInstance.get(
        "/api/v1/music/search/word",
        {
          params: {
            searchWord: searchQuery,
            page,
            size,
            filter,
          },
        }
      );
      if (songSearchResponse.status === 200) {
        console.log("노래 검색 성공:", songSearchResponse.data.content); // 성공 로그
        setSongResults(songSearchResponse.data.content);
      } else {
        console.error("노래 검색 실패: 상태 코드", songSearchResponse.status);
      }
    } catch (error) {
      console.error("노래 검색 에러:", error); // 오류 로그
    }
  };

  const handleSongListFetch = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/music/${uid}`, {
        params: {
          lastId: 100,
          size,
        },
      });
      if (response.status === 200) {
        console.log("노래 목록 조회 성공:", response.data.content);
      }
    } catch (error) {
      console.error("노래 목록 조회 에러:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      handleSongListFetch();
    }
  }, [uid, size]);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleUserSearch(searchQuery);
      handlePostSearch();
      handleSongSearch();
    } else {
      setSearchResults([]);
      setPostResults([]);
      setSongResults([]);
    }
  }, [searchQuery, filter, page, size]);

  const handleUserSearch = async (query: string) => {
    try {
      const searchResponse = await axiosInstance.get(
        "/api/v1/auth/user/search",
        {
          params: { keyword: query, lastId: 0 },
        }
      );

      if (searchResponse.status === 200) {
        let searchResults = searchResponse.data;
        if (isLoggedIn && uid) {
          searchResults = searchResults.filter(
            (user: UserInfoResponse) => user.uid !== uid
          );
          const followResponse = await axiosInstance.get(
            `/api/v1/follow/${uid}`
          );
          if (followResponse.status === 200) {
            const followedUids = followResponse.data.content.map(
              (user: UserInfoResponse) => user.uid.trim()
            );
            searchResults = searchResults.map((user: UserInfoResponse) => ({
              ...user,
              isFollowing: followedUids.includes(user.uid.trim()),
            }));
          }
        } else {
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
        {searchResults.length > 0 && (
          <S.SearchResults>
            {searchResults.map((user) => (
              <S.SearchResultItem key={user.id}>
                <S.UserLink to={`/user/${user.uid}/blog`}>
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
                  isFollowing={user.isFollowing}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </S.FollowButton>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
        {postResults.length > 0 && (
          <S.SearchResults>
            {postResults.map((post) => (
              <S.SearchResultItem key={post.id}>
                <S.UserLink
                  to={`/user/${post.uid}/post/${post.id}`}
                  onClick={onClose}
                >
                  <span>{post.title}</span>
                </S.UserLink>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
        {songResults.length > 0 && (
          <S.SearchResults>
            {songResults.map((song) => (
              <S.SearchResultItem key={song.musicId}>
                <S.UserLink to={`/user/${uid}/playlist`} onClick={onClose}>
                  <span>{song.title}</span>
                </S.UserLink>
                <S.LikeButton>
                  <FaHeart /> {song.totalLikes}
                </S.LikeButton>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
      </S.SearchPopupContainer>
    </S.PopupOverlay>
  );
};

export default SearchSong;
