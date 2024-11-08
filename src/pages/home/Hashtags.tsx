// 메인- 해시태그 추천
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/Hashtags.styles";



function Hashtags() {
    // 인기 해시태그 상태
    const [hashtags, setHashtags] = useState<string[]>([]);

    useEffect(() => {
      // 인기 해시태그 가져오기
      const fetchPopularHashtags = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/v1/post/search/hashtags`
          );
          console.log(response.data);
          setHashtags(response.data);
        } catch (error) {
          console.error("Failed to fetch popular hashtags:", error);
        }
      };

      fetchPopularHashtags();
    }, []);

    const getSize = (index: number): number => {
      if (index <= 2) return 10;
      if (index <= 5) return 8.5;
      return 7;
    };

    // 랜덤 위치를 지정하면서 겹치지 않도록 조정
    const generatePackedPositions = (numHashtags: number, baseRadius: number, spacing: number) => {
      const positions: Array<{ x: number, y: number }> = [];
      const angleIncrement = Math.PI * 2 / Math.sqrt(numHashtags);
    
      for (let i = 0; i < numHashtags; i++) {
        let angle = i * angleIncrement;
        let radius = baseRadius;
    
        // 중첩을 피하기 위해 무작위로 위치 조정
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
    
        while (positions.some(pos => Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2) < spacing)) {
          // 각도를 미세하게 조정해가며 새로운 위치 찾기
          angle += 0.1;
          radius += 2;
          x = radius * Math.cos(angle);
          y = radius * Math.sin(angle);
        }
    
        positions.push({ x, y });
      }
    
      return positions;
    };

    const baseRadius = 20;
    const spacing = 110;
    const positions = generatePackedPositions(hashtags.length, baseRadius, spacing);


  return (
    <S.Container>
      <S.HashTitle style={{ color: "white" }}>Hashtag</S.HashTitle>
      <S.HashInt>센티플이 제공하는 해시태그를 사용한 게시물을 구경하세요.</S.HashInt>
      <S.HashtagContainer>
        <S.HashGroup>
          {Array.isArray(hashtags) && hashtags.length > 0 ? (
            hashtags.map((hashtag, index) =>{
              const { x, y } = positions[index];
              return(
              <S.Hash key={index} size={getSize(index)} style={{ transform: `translate(${x}px, ${y}px)` }} >
                {hashtag}
              </S.Hash>)
            })
          ) : (
            <p>No popular hashtags available</p>
          )}
        </S.HashGroup>
      </S.HashtagContainer>
    </S.Container>
  );
}

export default Hashtags;

