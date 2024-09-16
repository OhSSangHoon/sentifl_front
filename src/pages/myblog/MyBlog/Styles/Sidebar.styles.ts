import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 350px;
  height: auto;
  background-color: #1e1e1e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const SidebarTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px 0;
`;

export const LeftIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    color: #ffffff;
    font-size: 20px;
    margin-right: 5px;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      color: #f5f5f5;
    }
  }
`;

export const RightIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 15px;
    color: #ffffff;
    font-size: 20px;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      color: #f5f5f5;
    }
  }
`;

export const PointText = styled.p`
  font-size: 14px;
  color: #ffffff;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #3f3f3f;
  margin: 20px 0;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: white;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PlaylistBadge = styled.div`
  background-color: #3f3f3f;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  &:hover {
    background-color: #5f5f5f;
  }
  &:active {
    background-color: #5f5f5f;
  }
`;

export const ProfileName = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 5px;
`;

export const ProfileStatItem = styled.div`
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.3s ease;

  small {
    font-size: 12px;
    color: #b5b5b5;
  }

  strong {
    font-size: 18px;
    color: #ffffff;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const Separator = styled.span`
  margin: 0 10px;
  color: #b5b5b5;
`;

export const Menu = styled.nav`
  margin-top: 30px;
`;

export const CategoryTitle = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

export const CategoryItem = styled.li`
  font-size: 14px;
  color: #b5b5b5;
  margin-bottom: 5px;

  &:before {
    content: "▶";
    margin-right: 5px;
    font-size: 10px;
  }
`;

export const PostListContainer = styled.div`
  margin-top: 20px;
  background-color: #282828;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  height: auto;
`;

export const PostListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const Icons = styled.div`
  display: flex;

  svg {
    margin-left: 10px;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      color: #f5f5f5;
    }
  }
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(217, 217, 217, 0.2);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  min-height: 50px;
`;

export const PostTitle = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

export const PostDate = styled.span`
  font-size: 14px;
  color: #ffffff;
`;

export const BlogPostProfile = styled.div`
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
