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

  // 사용자 검색 API 호출
  const handleSearch = async (query: string) => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/user/search", {
        params: { keyword: query, lastId: 0 },
      });
      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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
        <S.StyledNavLink to="/create-song">Create</S.StyledNavLink>
        <S.StyledNavLink to="/">Home</S.StyledNavLink>
      </S.Nav>
      <S.SearchContainer>
        <S.SearchInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <S.SearchIcon>
          <FaSearch />
        </S.SearchIcon> */}
        {searchResults.length > 0 && (
          <S.SearchResults>
            {searchResults.map((user) => (
              <S.SearchResultItem key={user.id}>
                <S.UserLink to={`/user/${user.uid}/blog`}>
                  <img
                    src={user.profile || "/default-profile.png"}
                    alt={user.nickName}
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                  <span>{user.nickName}</span>
                </S.UserLink>
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