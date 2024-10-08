import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import Sidebar from "../MyBlog/SideBar";
import * as S from "./Styles/BlogPost.styles";
import { FaPaperPlane, FaPlay, FaComment, FaHeart } from "react-icons/fa";
import { MdGraphicEq } from "react-icons/md";

interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
}

function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const { uid, profileImage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalLikes, totalViews } = location.state || {
    totalLikes: 0,
    totalViews: 0,
  }; // state에서 totalLikes와 totalViews 받기

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [liked, setLiked] = useState(false);

  // 게시글 데이터를 가져오는 함수
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        let allPosts: any[] = [];
        let currentPage = 0;
        let lastPage = false;

        // 페이지네이션을 이용해 모든 게시글 가져오기
        while (!lastPage) {
          const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
            params: { page: currentPage, size: 10 }, // 한 번에 10개씩 가져오기
          });

          if (response.status === 200) {
            allPosts = [...allPosts, ...response.data.content];
            lastPage = response.data.last; // 마지막 페이지 여부 확인
            currentPage += 1;
          } else {
            console.error("게시물 목록을 불러오는 중 오류 발생");
            break;
          }
        }

        // postId에 해당하는 게시물 찾기
        const selectedPost = allPosts.find(
          (p: any) => p.postId === Number(postId)
        );

        if (selectedPost) {
          const { postUrl, thumbnailUrl } = selectedPost;

          // S3에서 게시글 내용 가져오기
          const postContentResponse = await axiosInstance.get(postUrl);
          if (postContentResponse.status === 200) {
            const { title, content } = postContentResponse.data;

            setPost({
              title,
              content,
              thumbnailUrl,
            });
          }
        } else {
          console.error("해당 postId에 맞는 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    if (postId) {
      fetchAllPosts(); // postId가 있을 때만 게시물 데이터 가져오기
    }
  }, [postId, uid]);

  // 좋아요 상태를 토글하는 함수 추가
  const toggleLike = async () => {
    try {
      if (liked) {
        // 좋아요 취소 (DELETE 요청)
        const response = await axiosInstance.delete(
          `/api/v1/post/${postId}/like`
        );
        if (response.status === 204) {
          setLiked(false); // 좋아요 취소 후 상태 업데이트
        }
      } else {
        // 좋아요 추가 (POST 요청)
        const response = await axiosInstance.post(
          `/api/v1/post/${postId}/like`
        );
        if (response.status === 204) {
          setLiked(true); // 좋아요 추가 후 상태 업데이트
        }
      }
    } catch (error) {
      console.error("좋아요 상태 변경 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중 문제가 발생했습니다.</p>;
  }

  const toggleCommentInput = () => {
    setShowCommentInput((prev) => !prev);
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.BackgroundImage
          src={post.thumbnailUrl || "default_image.jpg"}
          alt="Background"
        />
        <S.TopRightContent>
          <S.ViewCount>조회수 : {totalViews}회</S.ViewCount>
        </S.TopRightContent>
        <S.LeftContent>
          <S.SongTitleWrapper>
            <S.SongTitle>노래제목</S.SongTitle> <FaPlay />
            <MdGraphicEq color="white" />
          </S.SongTitleWrapper>
          <S.CategoryAndTitle>
            <S.Category>카테고리</S.Category>
            <S.Title>{post.title}</S.Title>
          </S.CategoryAndTitle>
        </S.LeftContent>
        <S.BottomRightContent>
          <S.Date>2024.08.10</S.Date>
        </S.BottomRightContent>
      </S.TopSection>
      <S.MainContent>
        <S.SidebarWrapper>
          <Sidebar
            nickname={uid}
            uid={uid}
            profileImage={profileImage || "/default-profile.png"}
          />
        </S.SidebarWrapper>
        <S.PostContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <S.IconWrapper>
            <S.PostHeartIcon onClick={toggleLike}>
              <FaHeart color={liked ? "red" : "gray"} />
              <S.PostHeartCount>{totalLikes}</S.PostHeartCount>
            </S.PostHeartIcon>
            ;
            <S.PostCommentIcon onClick={toggleCommentInput}>
              <FaComment />
              <S.PostCommentCount>00</S.PostCommentCount>
            </S.PostCommentIcon>
          </S.IconWrapper>
          <S.CommentSection>
            <S.CommentTitle>댓글 00</S.CommentTitle>
            <S.Comment>
              <S.CommentAuthorWrapper>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <S.CommentAuthor>닉네임</S.CommentAuthor>
                  <S.CommentDate>2024.08.29</S.CommentDate>
                  <S.CommentHeartIcon>❤</S.CommentHeartIcon>
                  <S.CommentHeartCount>00</S.CommentHeartCount>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <S.CommentActionButtonWrapper>
                    <S.CommentActionButton>수정</S.CommentActionButton>
                    <S.CommentActionButton>삭제</S.CommentActionButton>
                  </S.CommentActionButtonWrapper>
                </div>
              </S.CommentAuthorWrapper>
              <S.CommentText>댓글 예시 댓글 예</S.CommentText>
            </S.Comment>
          </S.CommentSection>
        </S.PostContent>
        {showCommentInput && (
          <S.FixedBottomBar>
            <S.Icon>❤</S.Icon>
            <S.Icon>
              <FaComment />
            </S.Icon>
            <S.InputField type="text" placeholder="댓글을 입력하세요" />
            <S.Icon>
              <FaPaperPlane />
            </S.Icon>
          </S.FixedBottomBar>
        )}
      </S.MainContent>
    </S.Container>
  );
}

export default BlogPost;
