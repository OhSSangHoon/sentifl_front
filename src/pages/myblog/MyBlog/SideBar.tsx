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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import * as S from "./Styles/Sidebar.styles";

export interface SidebarProps {
  nickname: string;
  uid: string;
  profileImage: string;
  toggleFollowPopup?: () => void;
  toggleFollowingPopup?: () => void;
}

export interface Post {
  postId: number;
  postUrl: string;
  thumbnailUrl: string;
  createdTime: string;
  modifiedTime: string;
  totalLikes: number;
  totalViews: number;
}

export interface PostContent {
  title: string;
  content: string;
  thumbnailUrl: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleFollowPopup = () => {},
  toggleFollowingPopup = () => {},
}) => {
  const { uid } = useParams<{ uid: string }>();
  const { uid: loggedInUid } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCalendarVisible, setCalendarVisible] = useState(true);
  const [selectedDatePosts, setSelectedDatePosts] = useState<Post[]>([]);
  const [postContents, setPostContents] = useState<{
    [key: number]: PostContent;
  }>({});
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const isPostUrl = location.pathname.includes("post");
  const isBlogUrl = location.pathname.includes("blog");

  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(
    "/default-profile.png"
  );
  const [followCount, setFollowCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const handleDateClick = async (date: number) => {
    try {
      const selectedDate = new Date(currentYear, currentMonth, date);
      const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
        params: { page: 0, size: 120 },
      });

      const posts = response.data.content.filter((post: Post) => {
        const postDate = new Date(post.createdTime);
        return (
          postDate.getFullYear() === selectedDate.getFullYear() &&
          postDate.getMonth() === selectedDate.getMonth() &&
          postDate.getDate() === selectedDate.getDate()
        );
      });

      setSelectedDatePosts(posts);

      // 각 게시글의 제목과 내용을 불러와 postContents에 저장
      const postContentPromises = posts.map(async (post: Post) => {
        const postContentResponse = await axiosInstance.get(post.postUrl, {
          headers: { "Cache-Control": "no-cache" },
        });
        return {
          [post.postId]: postContentResponse.data,
        };
      });

      // 모든 postContentPromises가 완료된 후 객체로 합치기
      const postContentsArray = await Promise.all(postContentPromises);
      const postContentsObject = Object.assign({}, ...postContentsArray);
      setPostContents((prev) => ({ ...prev, ...postContentsObject }));

      console.log(postContentsObject);

      setCalendarVisible(false);
    } catch (error) {
      console.error("선택한 날짜의 게시글을 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/auth/user/search`, {
          params: { keyword: uid, lastId: 0 },
        });

        if (response.status === 200 && response.data.length > 0) {
          const user = response.data[0];
          setNickname(user.nickName);
          setProfileImage(user.profile || "/default-profile.png");
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

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
    if (uid) {
      fetchUserInfo();
      fetchFollowInfo();
    }
  }, [uid]);

  useEffect(() => {
    setCalendarVisible(true);
  }, [selectedDatePosts]);

  const handleBackToCalendar = () => {
    setCalendarVisible(true);
    setSelectedDatePosts([]);
  };

  const toggleCalendarVisibility = () => {
    setCalendarVisible((prevVisible) => !prevVisible);
  };

  const handlePenClick = () => {
    if (uid === loggedInUid) {
      navigate("/Create");
    } else {
      alert("게시글을 작성할 수 없습니다.");
    }
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

  const getDaysInMonth = (month: number, year: number) => {
    if (month === 1) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    }
    return [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };

  const formattedMonth = new Date(currentYear, currentMonth).toLocaleString(
    "ko-KR",
    { month: "long" }
  );

  return (
    <S.SidebarContainer>
      <S.SidebarTopBar>
        <S.LeftIcons>
          <FaParking size={18} />
          <S.PointText>0p</S.PointText>
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
          <FaPen onClick={handlePenClick} size={18} />
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
          <S.CalendarMonth>{formattedMonth}</S.CalendarMonth>
          {Array.from(
            { length: getDaysInMonth(currentMonth, currentYear) },
            (_, index) => {
              const date = index + 1;
              const isToday =
                currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth() &&
                date === new Date().getDate();
              return (
                <S.CalendarDate
                  key={date}
                  onClick={() => handleDateClick(date)}
                  isToday={isToday}
                >
                  {date}
                </S.CalendarDate>
              );
            }
          )}
        </S.CalendarContainer>
      ) : (
        <S.PostListContainer>
          <S.BackButton onClick={handleBackToCalendar}>
            ← Back to Calendar
          </S.BackButton>
          {selectedDatePosts.length > 0 ? (
            selectedDatePosts.map((post) => {
              const postContent = postContents[post.postId];
              return (
                <S.PostListItem
                  key={post.postId}
                  onClick={() => navigate(`/user/${uid}/post/${post.postId}`)}
                >
                  <h3>{postContent?.title || "제목 불러오는 중..."}</h3>
                  <p>
                    {postContent?.content
                      ? stripHtmlTags(postContent.content).length > 20
                        ? stripHtmlTags(postContent.content).slice(0, 20) +
                          "..."
                        : stripHtmlTags(postContent.content)
                      : "내용 불러오는 중..."}
                  </p>
                </S.PostListItem>
              );
            })
          ) : (
            <div style={{ marginTop: "50px" }}>
              해당 날짜에 게시글이 없습니다.
            </div>
          )}
        </S.PostListContainer>
      )}
    </S.SidebarContainer>
  );
};

export default Sidebar;
