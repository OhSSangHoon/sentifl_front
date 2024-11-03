// FollowBlog.tsx

import React from "react";
import * as S from "./Styles/FollowBlog.style";
import FollowPostList from "./FollowPostList";

import { useAuth } from "../../AuthProvider";

const FollowBlog = () => {
  return (
    <S.Container>
      <S.PostListWrapper>
        <FollowPostList />
      </S.PostListWrapper>
    </S.Container>
  );
};

export default FollowBlog;
