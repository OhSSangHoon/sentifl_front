import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAsterisk,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaParking,
  FaPen,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInterceptor";
import * as S from "./Styles/Sidebar.styles";
import { Post, PostContent } from "./PostList";

export interface SidebarProps {
  nickname: string;
  uid: string;
  profileImage: string;
  toggleFollowPopup?: () => void;
  toggleFollowingPopup?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  nickname,
  uid,
  profileImage,
  toggleFollowPopup = () => {},
  toggleFollowingPopup = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCalendarVisible, setCalendarVisible] = useState(true);
  const [selectedDatePosts, setSelectedDatePosts] = useState<Post[]>([]);
  const [postContents, setPostContents] = useState<{
    [key: number]: PostContent;
  }>({});
  const [currentMonth, setCurrentMonth] = useState("");

  const isPostUrl = location.pathname.includes("post");
  const isBlogUrl = location.pathname.includes("blog");

  const [followCount, setFollowCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const handleDateClick = async (date: number) => {
    try {
      const formattedDate = `2024-11-${String(date).padStart(2, "0")}`;
      const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
        params: {
          page: 0,
          size: 3,
          date: formattedDate,
        },
      });

      if (response.status === 200) {
        setSelectedDatePosts(response.data.content);

        response.data.content.forEach(async (post: Post) => {
          if (!postContents[post.postId]) {
            const postResponse = await axiosInstance.get(post.postUrl);
            if (postResponse.status === 200) {
              setPostContents((prev) => ({
                ...prev,
                [post.postId]: postResponse.data,
              }));
            }
          }
        });

        setCalendarVisible(false);
      } else {
        console.error("해당 날짜의 글 목록을 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("글 목록 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    // 팔로우 및 팔로잉 정보 불러오기
    const fetchFollowInfo = async () => {
      try {
        // 나를 팔로우한 사용자 수 불러오기
        const followedByResponse = await axiosInstance.get(
          `/api/v1/followedby/${uid}`
        );
        const followedByCount = followedByResponse.data.content.length; // content 배열의 길이를 사용해 팔로우 수 계산
        setFollowCount(followedByCount);

        // 내가 팔로우한 사용자 수 불러오기
        const followingResponse = await axiosInstance.get(
          `/api/v1/follow/${uid}`
        );
        const followingCount = followingResponse.data.content.length; // content 배열의 길이를 사용해 팔로잉 수 계산
        setFollowingCount(followingCount);
      } catch (error) {
        console.error("팔로우 정보 불러오기에 실패했습니다.", error);
      }
    };

    fetchFollowInfo();
  }, [uid]);

  const handleBackToCalendar = () => {
    setCalendarVisible(true);
    setSelectedDatePosts([]);
  };

  const toggleCalendarVisibility = () => {
    setCalendarVisible((prevVisible) => !prevVisible);
  };

  const handlePenClick = () => {
    navigate("/Create");
  };

  const goToPlaylist = () => {
    navigate(`/user/${uid}/playlist`);
  };

  const goToCreateSong = () => {
    navigate("/create-song");
  };

  const stripHtmlTags = (htmlContent: string) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <S.SidebarContainer>
      <S.SidebarTopBar>
        <S.LeftIcons>
          <FaParking size={18} />
          <S.PointText>60p</S.PointText>
        </S.LeftIcons>
        <S.RightIcons>
          <FaBell size={18} />
          <FaCog size={18} />
        </S.RightIcons>
      </S.SidebarTopBar>
      <S.Profile>
        <S.ProfileImageWrapper>
          <S.ProfileImage
            src={profileImage || "/default-profile.png"}
            alt="Profile"
          />
        </S.ProfileImageWrapper>
        <S.ProfileInfo>
          <S.PlaylistBadge onClick={goToPlaylist}>My Playlist</S.PlaylistBadge>
          <S.ProfileName>{nickname}</S.ProfileName>
          <S.ProfileDescription>
            자기 소개글을 작성 할 수 있습니다.
          </S.ProfileDescription>
          <S.ProfileStats>
            <S.ProfileStatItem onClick={toggleFollowPopup}>
              <small>follow</small>
              <strong>{followCount}</strong>
            </S.ProfileStatItem>
            <S.Separator>|</S.Separator>
            <S.ProfileStatItem onClick={toggleFollowingPopup}>
              <small>following</small>
              <strong>{followingCount}</strong>
            </S.ProfileStatItem>
          </S.ProfileStats>
        </S.ProfileInfo>
      </S.Profile>
      <S.Divider />
      <S.Menu>
        <S.MenuIconWrapper>
          <FaCalendarAlt size={18} onClick={toggleCalendarVisibility} />
          <FaPen onClick={handlePenClick} size={18} />{" "}
        </S.MenuIconWrapper>

        {/* <S.CategoryTitle>
          카테고리 <FaAngleDown />
        </S.CategoryTitle>
        <S.Icons>
          <FaPen onClick={handlePenClick} size={18} />
          <FaCalendarAlt size={18} />
        </S.Icons>
        <S.CategoryList>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
          <S.CategoryItem>카테고리 제목</S.CategoryItem>
        </S.CategoryList> */}
      </S.Menu>
      {isCalendarVisible ? (
        <S.CalendarContainer>
          <S.CalendarMonth>{currentMonth}</S.CalendarMonth>
          {Array.from({ length: 30 }, (_, index) => {
            const date = index + 1;
            return (
              <S.CalendarDate key={date} onClick={() => handleDateClick(date)}>
                {date}
              </S.CalendarDate>
            );
          })}
        </S.CalendarContainer>
      ) : (
        <S.PostListContainer>
          <S.BackButton onClick={handleBackToCalendar}>
            ← Back to Calendar
          </S.BackButton>
          {selectedDatePosts.slice(0, 3).map((post) => {
            const postContent = postContents[post.postId];
            return (
              <S.PostListItem
                key={post.postId}
                onClick={() => navigate(`/user/${uid}/post/${post.postId}`)}
              >
                <h3>{postContent.title || "제목 불러오는 중..."}</h3>
                {postContent.content
                  ? stripHtmlTags(postContent.content).length > 20
                    ? stripHtmlTags(postContent.content).slice(0, 20) + "..."
                    : stripHtmlTags(postContent.content)
                  : "내용 불러오는 중..."}
              </S.PostListItem>
            );
          })}
        </S.PostListContainer>
      )}
    </S.SidebarContainer>
  );
};

export default Sidebar;
