import React from "react";
import styled from "styled-components";
import Sidebar from "../MyBlog/SideBar";

function BlogPost() {
  return (
    <Container>
      <TopSection>
        <BackgroundImage src="path_to_your_image" alt="Background" />
        <Overlay>
          <LeftContent>
            <SongTitle>노래제목</SongTitle>
            <Category>카테고리</Category>
            <Title>작성한 제목이 표시됩니다.</Title>
          </LeftContent>
          <RightContent>
            <PostInfo>
              <Date>2024.08.10</Date>
              <ViewCount>조회수 : 87회</ViewCount>
              <Actions>
                <ActionButton>추가</ActionButton>
                <ActionButton>수정</ActionButton>
                <ActionButton>삭제</ActionButton>
              </Actions>
            </PostInfo>
          </RightContent>
        </Overlay>
      </TopSection>
      <MainContent>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <PostContent>
          <p>작성한 글이 표시됩니다.</p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
          <p>
            The weather's been all over the place lately—sunny one minute,
            pouring rain the next. It's like you can't leave the house without
            an umbrella just in case.
          </p>
        </PostContent>
      </MainContent>
    </Container>
  );
}

export default BlogPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 120vh;
  background-color: #0e0e0e;
  color: white;
  margin-top: 70px;
`;

const TopSection = styled.div`
  position: relative;
  width: 100%;
  height: 150px; /* 사진과 동일한 높이로 설정 */
  background-color: #333;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  position: absolute;
  top: 0;
  left: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

const SongTitle = styled.div`
  font-size: 12px;
  color: white;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 8px;
  border-radius: 3px;
`;

const Category = styled.div`
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: white;
  margin: 0;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 12px;
`;

const Date = styled.div`
  margin-right: 10px;
`;

const ViewCount = styled.div`
  margin-right: 10px;
`;

const Actions = styled.div`
  display: flex;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  margin-left: 10px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: white;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
`;

const SidebarWrapper = styled.div`
  width: 320px;
  margin-left: 40px;
  overflow-y: hidden;
  height: auto;
`;

const PostContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  font-size: 16px;
  line-height: 1.6;
  p {
    margin-bottom: 20px;
  }
  overflow-y: auto;
`;
