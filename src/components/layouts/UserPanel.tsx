import React, { useEffect, useState } from "react";
import { FiSettings, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/UserPanel.style";

import Character from "../../assets/characters/Login_character.png";


interface UserInfoResponse {
  id: number;
  uid: string;
  nickName: string;
  profile: string;
  isFollowing: boolean;
}

interface UserPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onClose, onLogout }) => {
  const { nickname, uid, isLoggedIn } = useAuth();
  const profileImage = localStorage.getItem("profileImage");

  const [followCount, setFollowCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfoResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 팔로우 및 팔로잉 정보 불러오기
    const fetchFollowInfo = async () => {
      try {
        const followedByResponse = await axiosInstance.get(
          `/api/v1/followedby/${uid}`
        );
        setFollowCount(followedByResponse.data.content.length);

        const followingResponse = await axiosInstance.get(
          `/api/v1/follow/${uid}`
        );
        setFollowingCount(followingResponse.data.content.length);
      } catch (error) {
        console.error("팔로우 정보 불러오기에 실패했습니다.", error);
      }
    };

    fetchFollowInfo();
  }, [uid]);

  // 사용자 검색 API 호출
  const handleUserSearch = async (query: string) => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/user/search", {
        params: { keyword: query, lastId: 0 },
      });

      if (response.status === 200) {
        let results = response.data;

        if (isLoggedIn && uid) {
          results = results.filter((user: UserInfoResponse) => user.uid !== uid);

          const followResponse = await axiosInstance.get(`/api/v1/follow/${uid}`);
          const followedUids = followResponse.data.content.map(
            (user: UserInfoResponse) => user.uid.trim()
          );

          results = results.map((user: UserInfoResponse) => ({
            ...user,
            isFollowing: followedUids.includes(user.uid.trim()),
          }));
        }

        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  // 팔로우/언팔로우 토글
  const handleFollowToggle = async (userUid: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await axiosInstance.delete("/api/v1/follow", { data: { uid: userUid } });
      } else {
        await axiosInstance.post("/api/v1/follow", { uid: userUid });
      }
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.uid === userUid
            ? { ...user, isFollowing: !isFollowing }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      handleUserSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <S.PopupOverlay onClick={(e) => e.currentTarget === e.target && onClose()}>
      <S.PopupContainer>
        <S.CloseButton onClick={onClose}>
          <FiX size={24} />
        </S.CloseButton>
        <S.UserProfile>
          <S.UserInfo>
            <S.UserNameAndPlaylist>
              <S.UserName>{nickname || "닉네임"}</S.UserName>
              <S.UserPlaylist onClick={() => navigate(`/user/${uid}/playlist`)}>
                My Playlist
              </S.UserPlaylist>
            </S.UserNameAndPlaylist>
            <S.UserStats>
              <S.FollowStat>
                <S.StatLabel>follow</S.StatLabel>
                <S.StatNumber>{followCount}</S.StatNumber>
              </S.FollowStat>
              <S.FollowStat>
                <S.StatLabel>following</S.StatLabel>
                <S.StatNumber>{followingCount}</S.StatNumber>
              </S.FollowStat>
            </S.UserStats>
          </S.UserInfo>
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={profileImage && !profileImage.includes("default_profile.jpeg") ? profileImage : Character}
              alt={nickname}
            />
            <S.Settings>
              <FiSettings size={24} />
            </S.Settings>
          </S.ProfileImageContainer>
        </S.UserProfile>
        <S.Tabs>
          <S.TabItem onClick={() => navigate(`/user/${uid}/blog`)}>My Blog</S.TabItem>
          <S.Divider />
          <S.TabItem onClick={() => setIsSearchMode(!isSearchMode)}>유저 찾기</S.TabItem>
        </S.Tabs>
        {isSearchMode && (
          <S.SearchContainer>
            <S.SearchInputWrapper>
              <S.SearchInput
                placeholder="유저 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </S.SearchInputWrapper>
            <S.SearchResults>
              {searchResults.map((user) => (
                <S.SearchResultItem key={user.id}>
                  <S.UserLink to={`/user/${user.uid}/blog`}>
                    <img
                      src={user.profile || Character}
                      alt={user.nickName}
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                    <span>{user.nickName}</span>
                  </S.UserLink>
                  <S.FollowButton
                    isFollowing={user.isFollowing}
                    onClick={() => handleFollowToggle(user.uid, user.isFollowing)}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </S.FollowButton>
                </S.SearchResultItem>
              ))}
            </S.SearchResults>
          </S.SearchContainer>
        )}
        
        <S.LogoutButton onClick={onLogout}>로그아웃</S.LogoutButton>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
};

export default UserPanel;