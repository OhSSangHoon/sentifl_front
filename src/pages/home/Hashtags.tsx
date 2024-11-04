// 메인- 해시태그 추천

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/Hashtags.styles";

function Hashtags() {
    // 인기 해시태그 상태
    const [hashtags, setHashtags] = useState<string[]>(["defaultHash1", "defaultHash2"]);

    useEffect(() => {
      // 인기 해시태그 가져오기
      const fetchPopularHashtags = async () => {
        try {
          const response = await axiosInstance.get(
            "/api/v1/post/search/hashtags"
          );
          console.log(response.data);
          setHashtags(response.data);
        } catch (error) {
          console.error("Failed to fetch popular hashtags:", error);
        }
      };
  
      fetchPopularHashtags();
    }, []);

  return (
    <S.Container>
      <h1 style={{ color: "white" }}>Hashtag</h1>
      <S.HashtagContainer>
        <p>센티플이 제공하는 해시태그를 사용한 게시물을 구경하세요.</p>
            {Array.isArray(hashtags) && hashtags.length > 0 ? (
              hashtags
                .map((hashtag, index) => <span key={index}>#{hashtag}</span>)
            ) : (
              <p>No popular hashtags available</p>
            )}
          </S.HashtagContainer>
    </S.Container>
  );
}

export default Hashtags;

