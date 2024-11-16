import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import PostList from "./PostList";
import Sidebar from "./SideBar";
import * as S from "./Styles/MyBlog.style";

type ActiveTabType = "follow" | "following" | null;

export interface SidebarProps {
  nickname: string;
  uid: string;
  profileImage: string;
  toggleFollowPopup?: () => void;
  toggleFollowingPopup?: () => void;
}

interface User {
  uid: string;
  nickname: string;
  profileImage: string;
}

const MyBlog = () => {
  const { uid } = useParams<{ uid: string }>();
  const { uid: loggedInUid, nickname, profileImage } = useAuth();
  const isOwner = uid === loggedInUid;

  const [activeTab, setActiveTab] = useState<ActiveTabType>(null);
  const [followedByList, setFollowedByList] = useState<User[]>([]);
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const openPopup = async (tab: "follow" | "following") => {
    setActiveTab(tab);
    setLoading(true);
    try {
      if (tab === "follow") {
        const response = await axiosInstance.get(`/api/v1/followedby/${uid}`);
        setFollowedByList(response.data.content);
      } else if (tab === "following") {
        const response = await axiosInstance.get(`/api/v1/follow/${uid}`);
        setFollowingList(response.data.content);
      }
    } catch (error) {
      console.error(`${tab} 목록 불러오기 실패:`, error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setActiveTab(null);

  return (
    <S.Container>
      <S.MainContent isOwner={isOwner}>
        <S.SidebarWrapper isOwner={isOwner}>
          <Sidebar
            nickname={nickname}
            uid={uid || ""}
            profileImage={profileImage || "/default-profile.png"}
            toggleFollowPopup={() => openPopup("follow")}
            toggleFollowingPopup={() => openPopup("following")}
          />
        </S.SidebarWrapper>
        <S.PostListWrapper isOwner={isOwner}>
          <PostList uid={uid || ""} />
        </S.PostListWrapper>
      </S.MainContent>

      {activeTab && (
        <S.Overlay>
          <S.Popup>
            <S.CloseButton onClick={closePopup}>×</S.CloseButton>
            <S.PopupHeader>
              <S.Tab
                active={activeTab === "follow"}
                onClick={() => openPopup("follow")}
              >
                Followers
              </S.Tab>
              <S.Tab
                active={activeTab === "following"}
                onClick={() => openPopup("following")}
              >
                Following
              </S.Tab>
            </S.PopupHeader>
            <S.PopupContent>
              {loading ? (
                <span>Loading...</span>
              ) : activeTab === "follow" ? (
                followedByList.map((user) => (
                  <S.FollowItem key={user.uid}>
                    <S.FollowProfile
                      src={user.profileImage || "/default-profile.png"}
                      alt={`${user.nickname}`}
                    />
                    <S.Nickname>{user.nickname}</S.Nickname>
                  </S.FollowItem>
                ))
              ) : (
                followingList.map((user) => (
                  <S.FollowingItem key={user.uid}>
                    <S.FollowProfile
                      src={user.profileImage || "/default-profile.png"}
                      alt={`${user.nickname}`}
                    />
                    <S.Nickname>{user.nickname}</S.Nickname>
                  </S.FollowingItem>
                ))
              )}
            </S.PopupContent>
          </S.Popup>
        </S.Overlay>
      )}
    </S.Container>
  );
};

export default MyBlog;