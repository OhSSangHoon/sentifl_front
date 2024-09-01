import React, { useState } from "react";
import styled from "styled-components";
import {
  FaBell,
  FaCog,
  FaAngleDown,
  FaPen,
  FaCalendarAlt,
  FaParking,
  FaStar,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePenClick = () => {
    navigate("/Create");
  };

  return (
    <SidebarContainer>
      {location.pathname === "/myblog" ? (
        <>
          <SidebarTopBar>
            <LeftIcons>
              <FaParking />
              <PointText>0p</PointText>
            </LeftIcons>
            <RightIcons>
              <FaBell />
              <FaCog />
            </RightIcons>
          </SidebarTopBar>
          <Profile>
            <ProfileImageWrapper>
              <ProfileImage src="path_to_profile_image" alt="Profile" />
            </ProfileImageWrapper>
            <ProfileInfo>
              <PlaylistBadge>My Playlist</PlaylistBadge>
              <ProfileName>닉네임</ProfileName>
              <ProfileStats>
                <ProfileStatItem>
                  <small>follow</small>
                  <br />
                  <strong>0</strong>
                </ProfileStatItem>
                <Separator>|</Separator>
                <ProfileStatItem>
                  <small>following</small>
                  <br />
                  <strong>0</strong>
                </ProfileStatItem>
              </ProfileStats>
            </ProfileInfo>
          </Profile>
        </>
      ) : (
        location.pathname === "/blogpost" && (
          <>
            <BlogPostProfile>
              <ProfileName>닉네임</ProfileName>
              <PlaylistBadge>My Playlist</PlaylistBadge>
              <FaStar />
            </BlogPostProfile>
          </>
        )
      )}
      <Divider />
      <Menu>
        <CategoryTitle>
          카테고리 <FaAngleDown />
        </CategoryTitle>
        <CategoryList>
          <CategoryItem>카테고리 제목</CategoryItem>
          <CategoryItem>카테고리 제목</CategoryItem>
        </CategoryList>
      </Menu>
      <Divider />
      <PostListContainer>
        <PostListHeader>
          글 목록
          <Icons>
            <FaPen onClick={handlePenClick} />
            <FaCalendarAlt />
          </Icons>
        </PostListHeader>
        <PostList>
          <PostItem>
            <PostTitle>제목 1</PostTitle>
            <PostDate>날짜</PostDate>
          </PostItem>
          <PostItem>
            <PostTitle>제목 2</PostTitle>
            <PostDate>날짜</PostDate>
          </PostItem>
          <PostItem>
            <PostTitle>제목 3</PostTitle>
            <PostDate>날짜</PostDate>
          </PostItem>
        </PostList>
      </PostListContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: #1e1e1e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SidebarTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px 0;
`;

const LeftIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    color: #ffffff;
    font-size: 20px;
  }
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 15px;
    color: #ffffff;
    font-size: 20px;
  }
`;

const PointText = styled.p`
  font-size: 14px;
  color: #ffffff;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3f3f;
  margin: 20px 0;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: white;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlaylistBadge = styled.div`
  background-color: #3f3f3f;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const ProfileName = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 5px;
`;

const ProfileStatItem = styled.div`
  font-size: 14px;
  line-height: 1.2;
  text-align: center;

  small {
    font-size: 12px;
    color: #b5b5b5;
  }

  strong {
    font-size: 18px;
    color: #ffffff;
  }
`;

const Separator = styled.span`
  margin: 0 10px;
  color: #b5b5b5;
`;

const Menu = styled.nav`
  margin-top: 30px;
`;

const CategoryTitle = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const CategoryItem = styled.li`
  font-size: 14px;
  color: #b5b5b5;
  margin-bottom: 5px;

  &:before {
    content: "▶";
    margin-right: 5px;
    font-size: 10px;
  }
`;

const PostListContainer = styled.div`
  margin-top: 20px;
  background-color: #282828;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  height: auto;
`;

const PostListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Icons = styled.div`
  display: flex;

  svg {
    margin-left: 10px;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(217, 217, 217, 0.2);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  min-height: 50px;
`;

const PostTitle = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

const BlogPostProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  h2 {
    font-size: 18px;
    margin-right: 10px;
  }

  div {
    background-color: #3f3f3f;
    color: #ffffff;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    margin-right: auto;
  }

  svg {
    color: #ffffff;
    font-size: 18px;
  }
`;
