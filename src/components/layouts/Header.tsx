import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/Header.styles";
import UserPanel from "./UserPanel";

interface UserInfoResponse {
  id: number;
  uid: string;
  nickName: string;
  profile: string;
  isFollowing: boolean;
}

function Header() {
  const { isLoggedIn, nickname, logout, uid } = useAuth();
  const profileImage = localStorage.getItem("profileImage");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfoResponse[]>([]);

  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    setIsPopupOpen(false);
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
    if (isFollowing) {
      handleUnfollow(uid);
    } else {
      handleFollow(uid);
    }
  };

  // 사용자 검색 API 호출
  const handleSearch = async (query: string) => {
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

  // 검색어 변경 시 호출
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]); // 검색어가 없으면 결과 초기화
    }
  }, [searchQuery]);

  return (
    <S.HeaderContainer>
      <S.Logo to="/">
        <img src="/path" alt="logo" />
      </S.Logo>
      <S.Nav>
        <S.StyledNavLink to="/precreate-song">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
      </S.Nav>
      <S.SearchContainer>
        <S.SearchInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                  disabled={false}
                  isFollowing={user.isFollowing}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </S.FollowButton>
              </S.SearchResultItem>
            ))}
          </S.SearchResults>
        )}
      </S.SearchContainer>
      {isLoggedIn ? (
        <S.ProfileLink onClick={togglePopup}>
          <img
            src={profileImage || "/default-profile.png"}
            alt={nickname}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </S.ProfileLink>
      ) : (
        <S.LoginLink to="/login">Log in</S.LoginLink>
      )}
      {isPopupOpen && (
        <UserPanel onClose={togglePopup} onLogout={handleLogout} />
      )}
    </S.HeaderContainer>
  );
}

export default Header;
