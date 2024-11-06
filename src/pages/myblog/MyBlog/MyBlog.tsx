// 내 블로그 메인
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import PostList from "./PostList";
import Sidebar from "./SideBar";
import * as s from "./Styles/MyBlog.style";

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
  const { nickname, profileImage } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTabType>(null);

  const openPopup = (tab: "follow" | "following") => setActiveTab(tab);
  const closePopup = () => setActiveTab(null);

  return (
    <s.Container>
      <Sidebar
        nickname={nickname}
        uid={uid || ""}
        profileImage={profileImage || "/default-profile.png"}
        toggleFollowPopup={() => openPopup("follow")}
        toggleFollowingPopup={() => openPopup("following")}
      />
      <s.PostListWrapper>
        <PostList uid={uid || ""}/>
      </s.PostListWrapper>

      {activeTab && (
        <s.Overlay>
          <s.Popup>
            <s.CloseButton onClick={closePopup}>×</s.CloseButton>
            <s.PopupHeader>
              <s.Tab
                active={activeTab === "follow"}
                onClick={() => setActiveTab("follow")}
              >
                follow
              </s.Tab>
              <s.Tab
                active={activeTab === "following"}
                onClick={() => setActiveTab("following")}
              >
                following
              </s.Tab>
            </s.PopupHeader>
            <s.PopupContent>
              {activeTab === "follow" ? (
                <s.FollowItem>
                  <s.FollowProfile />
                  <s.Nickname>닉네임</s.Nickname>
                </s.FollowItem>
              ) : (
                <s.FollowingItem>
                  <s.Nickname>닉네임</s.Nickname>
                  <s.FollowProfile />
                </s.FollowingItem>
              )}
            </s.PopupContent>
          </s.Popup>
        </s.Overlay>
      )}
    </s.Container>
  );
};

export default MyBlog;
