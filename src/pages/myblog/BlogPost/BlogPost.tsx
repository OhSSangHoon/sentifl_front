import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  musicTitle: string;
  musicUrl: string;
  totalLikes: number;
  totalViews: number;
  modifiedTime: string;
  createdTime: string;
}

interface CommentData {
  commentId: number;
  nickName: string;
  uid: string;
  content: string;
  totalLikes: number;
  time: string;
  isDelete: boolean;
  childComment: boolean;
}

function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const { uid, profileImage } = useAuth();

  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);

  const [isChildComment, setIsChildComment] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [totalCommentCount, setTotalCommentCount] = useState<number>(0);

  const [lastId, setLastId] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        let allPosts: any[] = [];
        let currentPage = 0;
        let lastPage = false;

        // 페이지네이션을 이용해 모든 게시글 가져오기
        while (!lastPage) {
          const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
            params: { page: currentPage, size: 10 },
          });

          if (response.status === 200) {
            allPosts = [...allPosts, ...response.data.content];
            lastPage = response.data.last;
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
          const { postUrl, totalLikes, totalViews, musicTitle, musicUrl } =
            selectedPost;

          // S3에서 게시글 내용 가져오기
          const postContentResponse = await axiosInstance.get(postUrl);
          if (postContentResponse.status === 200) {
            const { title, content } = postContentResponse.data;

            setPost({
              ...selectedPost,
              title,
              content,
            });

            setLikesCount(totalLikes);
            setViewsCount(totalViews);

            // 좋아요 상태 확인
            const likeResponse = await axiosInstance.get(
              `/api/v1/post/${postId}/like`
            );
            if (likeResponse.status === 200) {
              setLiked(true);
            } else if (likeResponse.status === 404) {
              setLiked(false);
            } else {
              console.error("좋아요 상태를 불러오는 중 문제가 발생했습니다.");
            }
          }
        } else {
          console.error("해당 postId에 맞는 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchAllPosts();
    }
  }, [postId, uid]);

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    if (!hasMore || loadingComments) return;

    setLoadingComments(true);
    try {
      const response = await axiosInstance.get("/api/v1/comment", {
        params: {
          postId: postId,
          lastId: lastId,
          size: 10,
        },
      });

      if (response.status === 200) {
        const newComments = response.data.content;

        if (newComments.length > 0) {
          setComments((prevComments) => [...prevComments, ...newComments]);
          setLastId(newComments[newComments.length - 1].commentId);
        }

        if (newComments.length === 0) {
          setHasMore(false);
        }
      } else {
        console.error("댓글을 불러오는 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // 초기 댓글 불러오기
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // 부모 댓글 작성 시
  const toggleCommentInput = () => {
    setShowCommentInput((prev) => !prev);
    setIsChildComment(false); // 부모 댓글로 설정
  };

  // 대댓글 작성 시 (childComment가 true인 경우 입력창이 뜨지 않도록 설정)
  const handleCommentClick = (commentId: number, childComment: boolean) => {
    if (!childComment) {
      setShowCommentInput(true);
      setIsChildComment(true); // 자식 댓글 설정
      setParentCommentId(commentId); // 부모 댓글 ID 설정
    } else {
      setShowCommentInput(false); // 대댓글인 경우 입력창을 비활성화
    }
  };

  // 댓글 작성
  const submitComment = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/comment`,
        {
          content: newCommentContent,
          childComment: isChildComment,
          parentCommentId:
            isChildComment && parentCommentId ? parentCommentId : 0,
        },
        {
          params: { postId: postId },
        }
      );

      if (response.status === 201) {
        window.location.reload();
        setNewCommentContent("");
        setShowCommentInput(false);
        setParentCommentId(null);
      } else {
        console.error("댓글 작성 중 오류 발생");
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/comment`, {
        params: { postId: postId },
        data: { commentId: commentId },
      });

      if (response.status === 204) {
        fetchComments();
      } else {
        console.error("댓글 삭제 중 오류 발생");
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  // 댓글 수정
  const handleEditComment = (comment: CommentData) => {
    setIsEditing(true);
    setEditingCommentId(comment.commentId);
    setCommentContent(comment.content); // 기존 댓글 내용 세팅
    setShowCommentInput(true);
  };

  const submitEditedComment = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/comment`,
        {
          content: commentContent,
          commentId: editingCommentId,
        },
        { params: { postId: postId } }
      );

      if (response.status === 204) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === editingCommentId
              ? { ...comment, content: commentContent }
              : comment
          )
        );
        setIsEditing(false);
        setEditingCommentId(null);
        setCommentContent("");
        setShowCommentInput(false);
      } else {
        console.error(
          "댓글 수정 중 문제가 발생했습니다. 상태 코드:",
          response.status
        );
      }
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  // 좋아요
  const handleLikeClick = async () => {
    try {
      if (liked) {
        const response = await axiosInstance.delete(
          `/api/v1/post/${postId}/like`
        );
        if (response.status === 204) {
          setLikesCount((prev) => prev - 1);
          setLiked(false);
        } else {
          console.error("좋아요 취소 중 문제가 발생했습니다.");
        }
      } else {
        const response = await axiosInstance.post(
          `/api/v1/post/${postId}/like`
        );
        if (response.status === 204) {
          setLikesCount((prev) => prev + 1);
          setLiked(true);
        } else {
          console.error("좋아요 처리 중 문제가 발생했습니다.");
        }
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentContent(e.target.value);
  };

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
          <S.ViewCount>조회수 :{viewsCount}회</S.ViewCount>
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
          <S.Date>
            {post.modifiedTime
              ? new Date(post.modifiedTime).toLocaleDateString()
              : new Date(post.createdTime).toLocaleDateString()}
          </S.Date>
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
            <S.PostHeartIcon onClick={handleLikeClick}>
              <FaHeart color={liked ? "red" : "gray"} />
              <S.PostHeartCount>{likesCount}</S.PostHeartCount>
            </S.PostHeartIcon>

            <S.PostCommentIcon onClick={toggleCommentInput}>
              <FaComment />
              <S.PostCommentCount>{totalCommentCount}</S.PostCommentCount>
            </S.PostCommentIcon>
          </S.IconWrapper>
          <S.CommentSection>
            <S.CommentTitle>댓글 {totalCommentCount}개</S.CommentTitle>
            {comments.map((comment) => (
              <S.Comment key={comment.commentId}>
                <S.CommentAuthorWrapper>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <S.CommentAuthor>{comment.nickName}</S.CommentAuthor>
                    <S.CommentDate>
                      {new Date(comment.time).toLocaleDateString()}
                    </S.CommentDate>
                    <S.CommentHeartIcon>❤</S.CommentHeartIcon>
                    <S.CommentHeartCount>
                      {comment.totalLikes}
                    </S.CommentHeartCount>
                    <S.ReplyButton
                      onClick={() =>
                        handleCommentClick(
                          comment.commentId,
                          comment.childComment
                        )
                      }
                    >
                      답글
                    </S.ReplyButton>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <S.CommentActionButtonWrapper>
                      <S.CommentActionButton
                        onClick={() => handleEditComment(comment)}
                      >
                        수정
                      </S.CommentActionButton>
                      <S.CommentActionButton
                        onClick={() => handleDeleteComment(comment.commentId)}
                      >
                        삭제
                      </S.CommentActionButton>
                    </S.CommentActionButtonWrapper>
                  </div>
                </S.CommentAuthorWrapper>
                <S.CommentText>
                  {comment.childComment && "(대댓글)"} {comment.content}
                </S.CommentText>
              </S.Comment>
            ))}
          </S.CommentSection>
          {hasMore && (
            <S.LoadMoreButton onClick={fetchComments}>더 보기</S.LoadMoreButton>
          )}
        </S.PostContent>
        {showCommentInput && (
          <S.FixedBottomBar>
            <S.Icon>
              <FaHeart />
            </S.Icon>
            <S.Icon>
              <FaComment />
            </S.Icon>
            <S.InputField
              type="text"
              placeholder={
                isEditing ? "댓글을 수정하세요" : "댓글을 입력하세요"
              }
              value={isEditing ? commentContent : newCommentContent} // 수정일 때는 commentContent, 작성일 때는 newCommentContent 사용
              onChange={
                isEditing
                  ? (e) => setCommentContent(e.target.value)
                  : handleCommentChange
              } // 수정일 때는 setCommentContent, 작성일 때는 handleCommentChange 사용
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  isEditing ? submitEditedComment() : submitComment();
                }
              }}
            />
            <S.Icon onClick={isEditing ? submitEditedComment : submitComment}>
              <FaPaperPlane />
            </S.Icon>
          </S.FixedBottomBar>
        )}
      </S.MainContent>
    </S.Container>
  );
}

export default BlogPost;
