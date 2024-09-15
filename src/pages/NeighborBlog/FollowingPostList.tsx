// 메인_이웃 블로그

import React from "react";
import * as S from "./Styles/FollowingPostList.styles";
import DotNav from "../../components/DotNav";

function FollowingPostsList() {
  return (
    <S.Container>
      <S.Title>NEW POST</S.Title>
      <S.PostList>
        <S.PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </S.PostItem>
        <S.PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </S.PostItem>
        <S.PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </S.PostItem>
        <S.PostItem>
          <span>카테고리</span>
          <span>이웃 블로그 제목</span>
          <span>yyyy.mm.dd</span>
        </S.PostItem>
      </S.PostList>
      <S.DotNavWrapper>
        <DotNav />
      </S.DotNavWrapper>
    </S.Container>
  );
}

export default FollowingPostsList;
