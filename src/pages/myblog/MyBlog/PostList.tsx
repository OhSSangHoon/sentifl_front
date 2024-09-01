import React from "react";
import * as S from "./Styles/PostList.styles";

const PostList = () => {
  return (
    <S.Content>
      <S.Post>
        <S.PostContentWrapper>
          <S.PostInfo>
            <S.PostHeader>
              <S.PostTitle>작성한 제목 입력</S.PostTitle>
              <S.PostMeta>
                <S.PostDate>yyyy.mm.dd</S.PostDate>
                <S.ActionButton>추가</S.ActionButton>
                <S.ActionButton>삭제</S.ActionButton>
                <S.HeartIcon>❤ count</S.HeartIcon>
              </S.PostMeta>
            </S.PostHeader>
            <S.PostDescription>
              The weather's been all over the place lately—sunny one minute,
              pouring rain the next. It's like you can't leave the house without
              an umbrella just in case.
            </S.PostDescription>
          </S.PostInfo>
          <S.PostImage src="path_to_image" alt="Post Visual" />
        </S.PostContentWrapper>
      </S.Post>
    </S.Content>
  );
};

export default PostList;
