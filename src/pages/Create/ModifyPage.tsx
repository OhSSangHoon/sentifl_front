import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor"; // axios 설정 가져오기

// Post 타입 정의 (S3에서 가져올 JSON 파일 구조)
interface Post {
  title: string;
  content: string; // HTML 형식
  thumbnailUrl: string | null;
  postUrl: string;
}

const ModifyPage = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [post, setPost] = useState<Post | null>(null); // S3 JSON 데이터를 저장할 상태
  const [postUrl, setPostUrl] = useState<string | null>(null); // DB에서 가져온 post_url

  // 1. 데이터베이스에서 post_url을 가져오는 함수
  useEffect(() => {
    const fetchPostUrl = async () => {
      try {
        // postId를 사용해 post_url을 DB에서 가져옴
        const response = await axiosInstance.get(`/post/${postId}`);
        const data = response.data;

        console.log("Fetched postUrl from DB:", data.postUrl); // postUrl 로그 추가
        setPostUrl(data.postUrl); // 데이터베이스에서 가져온 post_url 값을 저장
      } catch (error) {
        console.error("Error fetching post URL from DB:", error);
      }
    };

    if (postId) {
      fetchPostUrl(); // postId가 있을 때만 호출
    }
  }, [postId]);

  // 2. S3에서 JSON 파일을 가져오는 함수
  useEffect(() => {
    const fetchPostData = async () => {
      if (postUrl) {
        try {
          console.log("Fetching post data from S3 with URL:", postUrl); // S3 postUrl 로그 추가
          const response = await fetch(postUrl); // S3의 JSON 파일 요청
          const postData: Post = await response.json(); // JSON 파일 파싱

          console.log("Fetched post data from S3:", postData); // Fetched 데이터 로그 추가
          // S3에서 가져온 데이터를 상태로 저장
          setPost(postData);
        } catch (error) {
          console.error("Error fetching post data from S3:", error);
        }
      }
    };

    if (postUrl) {
      fetchPostData(); // postUrl이 있을 때만 호출
    }
  }, [postUrl]);

  if (!post) {
    return <div>Loading...</div>; // post 데이터가 로드되기 전 로딩 화면 표시
  }

  return (
    <div>
      <h1>{post.title}</h1>
      
      {/* 썸네일 이미지 표시 */}
      {post.thumbnailUrl && (
        <img src={post.thumbnailUrl} alt="썸네일 이미지" />
      )}
      
      {/* content에 포함된 HTML을 그대로 렌더링 */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default ModifyPage;