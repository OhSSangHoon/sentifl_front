// 메인_이웃 블로그

import * as S from "./Styles/NewPost.styles";

function NewPost() {
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
    </S.Container>
  );
}

export default NewPost;
