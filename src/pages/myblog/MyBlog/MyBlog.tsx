// // 내 블로그-메인

import React, { useState } from "react";
import * as s from "./Styles/MyBlog.style";
import PostList from "./PostList";
import Sidebar from "./SideBar";
import { useParams } from "react-router-dom";

type ActiveTabType = "follow" | "following" | null;

const MyBlog = () => {
  const { uid } = useParams();

  const [activeTab, setActiveTab] = useState<ActiveTabType>(null);

  const openPopup = (tab: "follow" | "following") => setActiveTab(tab);
  const closePopup = () => setActiveTab(null);

  return (
    <s.Container>
      <Sidebar
        toggleFollowPopup={() => openPopup("follow")}
        toggleFollowingPopup={() => openPopup("following")}
      />
      <s.PostListWrapper>
        <PostList />
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

// import React, { useState } from "react";
// import * as s from "./Styles/MyBlog.style";
// import PostList from "./PostList";
// import Sidebar from "./SideBar";

// const MyBlog = () => {
//   const [showFollowPopup, setShowFollowPopup] = useState(false);
//   const [showFollowingPopup, setShowFollowingPopup] = useState(false);

//   const toggleFollowPopup = () => {
//     setShowFollowPopup(true);
//     setShowFollowingPopup(false);
//   };

//   const toggleFollowingPopup = () => {
//     setShowFollowingPopup(true);
//     setShowFollowPopup(false);
//   };

//   const closePopup = () => {
//     setShowFollowPopup(false);
//     setShowFollowingPopup(false);
//   };

//   return (
//     <s.Container>
//       <Sidebar
//         toggleFollowPopup={toggleFollowPopup}
//         toggleFollowingPopup={toggleFollowingPopup}
//       />
//       <s.PostListWrapper>
//         <PostList />
//       </s.PostListWrapper>

//       {showFollowPopup && (
//         <s.Overlay>
//           <s.Popup>
//             <s.CloseButton onClick={closePopup}>×</s.CloseButton>
//             <s.PopupHeader>
//               <s.Tab active={true} onClick={toggleFollowPopup}>
//                 follow
//               </s.Tab>
//               <s.Tab active={false} onClick={toggleFollowingPopup}>
//                 following
//               </s.Tab>
//             </s.PopupHeader>
//             <s.PopupContent>
//               <s.FollowItem>
//                 <s.FollowProfile />
//                 <s.Nickname>닉네임</s.Nickname>
//               </s.FollowItem>
//             </s.PopupContent>
//           </s.Popup>
//         </s.Overlay>
//       )}

//       {showFollowingPopup && (
//         <s.Overlay>
//           <s.Popup>
//             <s.CloseButton onClick={closePopup}>×</s.CloseButton>
//             <s.PopupHeader>
//               <s.Tab active={false} onClick={toggleFollowPopup}>
//                 follow
//               </s.Tab>
//               <s.Tab active={true} onClick={toggleFollowingPopup}>
//                 following
//               </s.Tab>
//             </s.PopupHeader>
//             <s.PopupContent>
//               <s.FollowingItem>
//                 <s.Nickname>닉네임</s.Nickname>
//                 <s.FollowProfile />
//               </s.FollowingItem>
//             </s.PopupContent>
//           </s.Popup>
//         </s.Overlay>
//       )}
//     </s.Container>
//   );
// };

// export default MyBlog;
