import { useEffect, useState } from "react";
import { FaPaperPlane, FaPlay, FaWaveSquare } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import axiosInstance from "../../../axiosInterceptor";
import Sidebar from "../MyBlog/SideBar";
import * as S from "./Styles/BlogPost.styles";

interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
}

function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const { nickname, uid, profileImage } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAddClick = () => {
    navigate("/Create");
  };

  useEffect(() => {
    // 게시글 데이터를 가져오는 함수
    const fetchPostData = async () => {
      try {
        // 백엔드에서 postId를 이용해 해당 게시글의 postUrl과 썸네일 URL 가져오기
        const response = await axiosInstance.get(`/post/${uid}/${postId}`);
        if (response.status === 200) {
          const { postUrl, thumbnailUrl } = response.data;

          // S3에서 postUrl을 이용해 게시글의 내용 가져오기
          const postContentResponse = await axiosInstance.get(postUrl);
          if (postContentResponse.status === 200) {
            const { title, content } = postContentResponse.data;

            // 가져온 데이터를 상태에 저장
            setPost({
              title,
              content,
              thumbnailUrl,
            });
          }
        } else {
          console.log("게시글 데이터를 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, uid]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중 문제가 발생했습니다.</p>;
  }

  return (
    <S.Container>
      <S.TopSection>
        <S.BackgroundImage
          src={post.thumbnailUrl || "default_image.jpg"}
          alt="Background"
        />

        <S.TopRightContent>
          <S.ViewCount>조회수 : 0회</S.ViewCount>
        </S.TopRightContent>
        <S.LeftContent>
          <S.SongTitleWrapper>
            <S.SongTitle>노래제목</S.SongTitle> <FaPlay />
            <FaWaveSquare />
          </S.SongTitleWrapper>
          <S.CategoryAndTitle>
            <S.Category>카테고리</S.Category>
            <S.Title>{post.title}</S.Title>
          </S.CategoryAndTitle>
        </S.LeftContent>
        <S.BottomRightContent>
          <S.Date>2024.08.10</S.Date>
          <S.Actions>
            <S.ActionButton onClick={handleAddClick}>추가</S.ActionButton>
            <S.ActionButton>수정</S.ActionButton>
            <S.ActionButton>삭제</S.ActionButton>
          </S.Actions>
        </S.BottomRightContent>
      </S.TopSection>
      <S.MainContent>
        <S.SidebarWrapper>
          <Sidebar
            nickname={nickname}
            uid={uid}
            profileImage={profileImage || "/default-profile.png"}
            toggleFollowPopup={() => {}}
            toggleFollowingPopup={() => {}}
          />
        </S.SidebarWrapper>
        <S.PostContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <S.IconWrapper>
            <S.PostHeartIcon>
              ❤<S.PostHeartCount>00</S.PostHeartCount>
            </S.PostHeartIcon>
            <S.PostCommentIcon>
              💬
              <S.PostCommentCount>00</S.PostCommentCount>
            </S.PostCommentIcon>
          </S.IconWrapper>
          <S.CommentSection>
            <S.CommentTitle>댓글 00</S.CommentTitle>
            <S.Comment>
              <S.CommentAuthorWrapper>
                <S.CommentAuthor>닉네임</S.CommentAuthor>
                <S.CommentDate>2024.08.29</S.CommentDate>
                <S.CommentHeartIcon>❤</S.CommentHeartIcon>
                <S.CommentHeartCount>00</S.CommentHeartCount>
                <S.ReplyButton>답글</S.ReplyButton>
              </S.CommentAuthorWrapper>
              <S.CommentText>댓글 예시 댓글 예</S.CommentText>
              <S.CommentActions>
                <S.CommentActionButtonWrapper>
                  <S.CommentActionButton>수정</S.CommentActionButton>
                  <S.CommentActionButton>삭제</S.CommentActionButton>
                </S.CommentActionButtonWrapper>
              </S.CommentActions>
            </S.Comment>
          </S.CommentSection>
        </S.PostContent>
      </S.MainContent>
      <S.FixedBottomBar>
        <S.HeartIcon>❤</S.HeartIcon>
        <S.Icon>💬</S.Icon>
        <S.InputField type="text" placeholder="댓글을 입력하세요" />
        <S.Icon>
          <FaPaperPlane />
        </S.Icon>
      </S.FixedBottomBar>
    </S.Container>
  );
}

export default BlogPost;
