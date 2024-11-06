// 내 블로그 메인
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
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

const MyBlog = () => {
  const { uid } = useParams<{ uid: string }>();
  const { uid: loggedInUid, nickname, profileImage } = useAuth();
  const isOwner = uid === loggedInUid;

  const [activeTab, setActiveTab] = useState<ActiveTabType>(null);

  const openPopup = (tab: "follow" | "following") => setActiveTab(tab);
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
                onClick={() => setActiveTab("follow")}
              >
                follow
              </S.Tab>
              <S.Tab
                active={activeTab === "following"}
                onClick={() => setActiveTab("following")}
              >
                following
              </S.Tab>
            </S.PopupHeader>
            <S.PopupContent>
              {activeTab === "follow" ? (
                <S.FollowItem>
                  <S.FollowProfile />
                  <S.Nickname>닉네임</S.Nickname>
                </S.FollowItem>
              ) : (
                <S.FollowingItem>
                  <S.Nickname>닉네임</S.Nickname>
                  <S.FollowProfile />
                </S.FollowingItem>
              )}
            </S.PopupContent>
          </S.Popup>
        </S.Overlay>
      )}
    </S.Container>
  );
};

export default MyBlog;
