import { useEffect, useState } from "react";
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
  const { uid } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  // 게시글 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 1. 특정 사용자의 게시물 목록에서 해당 postId로 게시물 정보 가져오기
        const response = await axiosInstance.get(`/post/${uid}`); // uid로 게시물 목록 가져오기
        if (response.status === 200) {
          const postList = response.data.content;

          // 2. postId에 해당하는 게시물 찾기
          const selectedPost = postList.find((p: any) => p.postId === Number(postId));

          if (selectedPost) {
            const { postUrl, thumbnailUrl } = selectedPost;

            // 3. postUrl로 게시글 내용 가져오기 (S3에서)
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
            console.error("해당 postId에 맞는 게시글을 찾을 수 없습니다.");
          }
        } else {
          console.error("게시물 목록을 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    if (postId) {
      fetchPostData(); // postId가 있을 때만 게시물 데이터 가져오기
    }
  }, [postId, uid]); // postId, uid 변경 시 다시 호출

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시글을 불러오는 중 문제가 발생했습니다.</p>;
  }

  return (
    <S.Container>
      <S.TopSection>
<<<<<<< HEAD
        <S.BackgroundImage
          src={post.thumbnailUrl || "default_image.jpg"}
          alt="Background"
        />

=======
        <S.BackgroundImage src={post.thumbnailUrl || "default_image.jpg"} alt="Background" />
>>>>>>> sh_develop
        <S.TopRightContent>
          <S.ViewCount>조회수 : 0회</S.ViewCount>
        </S.TopRightContent>
        <S.LeftContent>
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
          <Sidebar nickname={uid} uid={uid} profileImage="/default-profile.png" />
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
    </S.Container>
  );
}

export default BlogPost;
