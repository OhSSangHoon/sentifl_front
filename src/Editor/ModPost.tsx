import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // URL에서 postId를 가져오기 위한 useParams 사용
import axiosInstance from "../axiosInterceptor"; // axiosInstance로 API 요청
import * as S from "./Styles/Editor.style"; // 스타일 파일

// 컴포넌트 정의
const ModPost: React.FC = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [title, setTitle] = useState<string>(""); // 제목을 저장하는 상태
  const [content, setContent] = useState<string>(""); // 내용을 저장하는 상태
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리

  // API를 호출하여 게시글 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/post/${postId}`); // postId로 API 호출
        const postData = response.data;

        console.log("Post data:", postData); // 전체 데이터 확인용 로그
        console.log("title: ", title);

        // title과 content 상태 업데이트
        setTitle(postData.title || "제목 없음");
        setContent(postData.content || "내용이 없습니다.");
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    if (postId) {
      fetchPostData(); // postId가 있을 경우에만 데이터 가져오기
    }
  }, [postId]);

  // 로딩 중일 때 로딩 메시지 출력
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.EditorWrapper>
      <h1>{title}</h1> {/* 제목 출력 */}
      <div dangerouslySetInnerHTML={{ __html: content }}></div> {/* HTML 형식으로 내용 출력 */}
    </S.EditorWrapper>
  );
};

export default ModPost;
