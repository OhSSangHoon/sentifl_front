// // 내 블로그- 사이드바
// import {
//   FaAngleDown,
//   FaBell,
//   FaCalendarAlt,
//   FaCog,
//   FaParking,
//   FaPen,
//   FaStar,
// } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../AuthProvider";
// import * as S from "./Styles/Sidebar.styles";

// const Sidebar: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { nickname, uid, profileImage } = useAuth();

//   const handlePenClick = () => {
//     navigate("/Create");
//   };

//   const goToPlaylist = () => {
//     navigate("/playlist");
//   };

//   return (
//     <S.SidebarContainer>
//       <>
//         <S.SidebarTopBar>
//           <S.LeftIcons>
//             <FaParking />
//             <S.PointText>0p</S.PointText>
//           </S.LeftIcons>
//           <S.RightIcons>
//             <FaBell />
//             <FaCog />
//           </S.RightIcons>
//         </S.SidebarTopBar>
//         <S.Profile>
//           <S.ProfileImageWrapper>
//             <S.ProfileImage
//               src={profileImage || "path_to_profile_image"}
//               alt="Profile"
//             />
//           </S.ProfileImageWrapper>
//           <S.ProfileInfo>
//             <S.PlaylistBadge>My Playlist</S.PlaylistBadge>
//             <S.ProfileName>{nickname}</S.ProfileName>
//             <S.ProfileStats>
//               <S.ProfileStatItem>
//                 <small>follow</small>
//                 <br />
//                 <strong>0</strong>
//               </S.ProfileStatItem>
//               <S.Separator>|</S.Separator>
//               <S.ProfileStatItem>
//                 <small>following</small>
//                 <br />
//                 <strong>0</strong>
//               </S.ProfileStatItem>
//             </S.ProfileStats>
//           </S.ProfileInfo>
//         </S.Profile>
//       </>
//       <S.Divider />
//       <S.Menu>
//         <S.CategoryTitle>
//           카테고리 <FaAngleDown />
//         </S.CategoryTitle>
//         <S.CategoryList>
//           <S.CategoryItem>카테고리 제목</S.CategoryItem>
//           <S.CategoryItem>카테고리 제목</S.CategoryItem>
//         </S.CategoryList>
//       </S.Menu>
//       <S.Divider />
//       <S.Icons>
//         <FaPen onClick={handlePenClick} />
//         <FaCalendarAlt />
//       </S.Icons>
//     </S.SidebarContainer>
//   );
// };

// export default Sidebar;

import React from "react";
import {
  FaAngleDown,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaParking,
  FaPen,
  FaStar,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import * as S from "./Styles/Sidebar.styles";

interface SidebarProps {
  toggleFollowPopup: () => void;
  toggleFollowingPopup: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleFollowPopup,
  toggleFollowingPopup,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname, uid, profileImage } = useAuth();

  const handlePenClick = () => {
    navigate("/Create");
  };

  const goToPlaylist = () => {
    navigate("/playlist");
  };

  return (
    <S.SidebarContainer>
      <>
        <S.SidebarTopBar>
          <S.LeftIcons>
            <FaParking />
            <S.PointText>0p</S.PointText>
          </S.LeftIcons>
          <S.RightIcons>
            <FaBell />
            <FaCog />
          </S.RightIcons>
        </S.SidebarTopBar>
        <S.Profile>
          <S.ProfileImageWrapper>
            <S.ProfileImage
              src={profileImage || "path_to_profile_image"}
              alt="Profile"
            />
          </S.ProfileImageWrapper>
          <S.ProfileInfo>
            <S.PlaylistBadge>My Playlist</S.PlaylistBadge>
            <S.ProfileName>{nickname}</S.ProfileName>
            <S.ProfileStats>
              <S.ProfileStatItem onClick={toggleFollowPopup}>
                <small>follow</small>
                <br />
                <strong>0</strong>
              </S.ProfileStatItem>
              <S.Separator>|</S.Separator>
              <S.ProfileStatItem onClick={toggleFollowingPopup}>
                <small>following</small>
                <br />
                <strong>0</strong>
              </S.ProfileStatItem>
            </S.ProfileStats>
          </S.ProfileInfo>
        </S.Profile>
      </>
      <S.Divider />
      <S.Menu>
        <S.CategoryTitle>
          카테고리 <FaAngleDown />
        </S.CategoryTitle>
        <S.CategoryList>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
        </S.CategoryList>
      </S.Menu>
      <S.Divider />
      <S.Icons>
        <FaPen onClick={handlePenClick} />
        <FaCalendarAlt />
      </S.Icons>
    </S.SidebarContainer>
  );
};

export default Sidebar;
