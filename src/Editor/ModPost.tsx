import Quill from "quill"; // Quill을 불러와서 Delta 변환을 위해 사용
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import * as S from "./Styles/Editor.style";

interface EditorProps {
  loadFromTempSave: boolean;
  postId: string | undefined;
}

const ModPost: React.FC<EditorProps> = ({ loadFromTempSave, postId }) => {
  const [title, setTitle] = useState<string>("제목 없음");
  const [content, setContent] = useState<string>(""); // HTML 형식으로 변환된 내용 상태
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [postUrl, setPostUrl] = useState<string | null>(null); // postUrl 상태 추가
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null); // 썸네일 URL 상태 추가
  const { uid } = useAuth();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        console.log("Fetching post data for postId:", postId); // postId 로그 출력
        const response = await axiosInstance.get(`/post/${uid}/${postId}`);
        const postData = response.data;

        console.log("Post data received:", postData); // postData 로그 출력

        if (postData.content) {
          try {
            const deltaContent = JSON.parse(postData.content);
            const quill = new Quill(document.createElement("div"));
            quill.setContents(deltaContent);
            const htmlContent = quill.root.innerHTML;

            setTitle(postData.title || "제목 없음");
            setContent(htmlContent || "내용이 없습니다.");
            setPostUrl(postData.postUrl || null); // postUrl 설정
            setThumbnailUrl(postData.thumbnailUrl || null); // 썸네일 설정

            // postUrl, thumbnailUrl, postId 로그 출력
            console.log("postUrl:", postData.postUrl);
            console.log("thumbnailUrl:", postData.thumbnailUrl);
            console.log("postId:", postId);
          } catch (parseError) {
            console.error("Content 파싱 중 오류 발생:", parseError);
            setContent("내용을 불러오는 중 오류가 발생했습니다.");
          }
        } else {
          setContent("내용이 없습니다.");
        }
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <S.EditorWrapper>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div> {/* 변환된 HTML을 출력 */}
    </S.EditorWrapper>
  );
};

export default ModPost;