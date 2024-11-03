import styled, { keyframes } from "styled-components";

export interface PostData {
  title: string;
  content: string;
  thumbnailUrl: string | null;
  musicTitle: string;
  musicUrl: string;
  totalLikes: number;
  totalViews: number;
  modifiedTime: string;
  createdTime: string;
  uid: string;
}

export interface CommentData {
  commentId: number;
  nickName: string;
  uid: string;
  content: string;
  totalLikes: number;
  time: string;
  isDelete: boolean;
  childComment: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 140vh;
  background-color: #0e0e0e;
  color: white;
`;

export const TopSection = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #333;
  overflow: hidden;
  margin-top: 80px;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  position: absolute;
  top: 0;
  left: 0;
`;

export const TopRightContent = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  color: #aaa;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const SongTitleWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 20px;
  border-radius: 30px;
  gap: 10px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const SongTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: white;
`;

export const CategoryAndTitle = styled.div`
  position: absolute;
  top: 75%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px;
`;

export const Category = styled.div`
  font-size: 16px;
  color: white;
`;

export const Hash = styled.div`
  margin-top: 50px;
  display: flex;
  float: left;
  width: 100px;
  height: 40px;
  margin-right: 5px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  color: white;
  margin: 0;
`;

export const ViewCount = styled.div`
  color: #aaa;
  font-size: 14px;
`;

export const BottomRightContent = styled.div`
  position: absolute;
  bottom: 50px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Date = styled.div`
  color: #aaa;
  font-size: 14px;
  margin-right: 10px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 80px;
  max-width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 10px;
`;

export const PostHeartIcon = styled.div`
  background-color: #1e1e1e;
  padding: 5px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }
`;

export const PostCommentIcon = styled.div`
  background-color: #1e1e1e;
  padding: 5px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }
`;

export const PostHeartCount = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: white;
  &:hover {
    color: black;
  }
`;

export const PostCommentCount = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: white;
  &:hover {
    color: black;
  }
`;

export const SidebarWrapper = styled.div`
  width: 350px;
  margin-left: 20px;
  margin-right: 40px;
  overflow-y: hidden;
`;

export const PostContent = styled.div`
  flex-grow: 1;
  position: relative;
  min-width: 500px;
  max-width: 1000px;
  word-wrap: break-word;
  padding: 40px;
  padding-bottom: 120px;
  font-size: 16px;
  line-height: 1.6;
  background: #0e0e0e;
  border-radius: 8px;
  p {
    margin-bottom: 20px;
  }
  overflow-y: auto;
`;

export const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

export const InputField = styled.input`
  flex: 1;
  background-color: #444;
  border: none;
  padding: 10px;
  margin: 0 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
`;

export const Icon = styled.span`
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
  transition: color 0.3s, opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const CommentSection = styled.div`
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #333;
`;

export const CommentTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

export const Comment = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #444;
  color: #b5b5b5;
`;

export const CommentAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양쪽 끝에 배치 */
  margin-bottom: 10px;
  width: 100%;
`;

export const CommentAuthor = styled.div`
  font-size: 14px;
  color: #aaa;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #777;
  margin-right: 10px;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #ddd;
  margin-top: 10px;
`;

export const CommentActionButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentActionButton = styled.button`
  background: #333;
  color: white;
  font-size: 14px;
  border: none;
  padding: 8px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #555;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

export const CommentHeartIcon = styled.span`
  font-size: 14px;
  color: #aaa;

  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const CommentHeartCount = styled.span`
  font-size: 14px;
  color: #aaa;
`;

export const LoadMoreButton = styled.button`
  background-color: rgba(217, 217, 217, 0.1);
  color: white;
  border: 0.1px solid #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(217, 217, 217, 0.2);
  }
  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

export const ReplyButton = styled.span`
  cursor: pointer;
  color: gray;

  &:hover {
    color: rgba(256, 256, 256, 0.2);
  }

  &:active {
    color: rgba(256, 256, 256, 0.2);
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
