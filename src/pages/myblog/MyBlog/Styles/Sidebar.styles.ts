import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 350px;
  height: 100vh;
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
  padding: 10px 0;
`;

export const LeftIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    color: #ffffff;
    font-size: 24px;
  }
`;

export const RightIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 15px;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;

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
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileInfo = styled.div`
  text-align: center;
`;

export const PlaylistBadge = styled.div`
  background-color: #3f3f3f;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: inline-block;
  width: auto;
  cursor: pointer;

  &:hover {
    background-color: #5f5f5f;
  }
`;

export const ProfileName = styled.h2`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const ProfileDescription = styled.p`
  font-size: 12px;
  color: #b5b5b5;
  margin-bottom: 20px;
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProfileStatItem = styled.div`
  text-align: center;
  cursor: pointer;
  font-size: 14px;

  small {
    display: block;
    color: #b5b5b5;
  }

  strong {
    color: #ffffff;
    font-size: 18px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Separator = styled.div`
  margin: 0 15px;
  color: #ffffff;
`;

export const Menu = styled.nav`
  margin-top: 5px;
  position: relative;
`;

export const CategoryTitle = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;

  svg {
    margin-left: 10px;
  }
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
`;

export const CategoryItem = styled.li`
  font-size: 14px;
  color: #b5b5b5;
  margin-bottom: 10px;
  cursor: pointer;

  &:before {
    content: "▶";
    margin-right: 5px;
    font-size: 10px;
  }
`;

export const Icons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 10px;

  svg {
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      color: #f5f5f5;
    }
  }
`;
