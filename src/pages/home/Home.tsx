// 메인 홈

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInterceptor";
import DotNav from "../../components/DotNav";
import * as S from "./Styles/Home.styles";


interface FollowRequest {
  uid: string;
}

function Home() {

  const [uid, setUid] = useState<string>(""); // uid를 입력받는 상태
  const [message, setMessage] = useState<string>(""); // 결과 메시지 상태
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followCount, setFollowCount] = useState<number>(0);

  useEffect(() => {
    const savedFollowingCount = localStorage.getItem("followingCount");
    const savedFollowCount = localStorage.getItem("followCount");

    if (savedFollowingCount) setFollowingCount(Number(savedFollowingCount));
    if (savedFollowCount) setFollowCount(Number(savedFollowCount));
  }, []);

  // 팔로우 버튼 클릭 시 호출되는 함수
  const handleFollow = async () => {
    if (!uid) {
      setMessage("UID를 입력하세요.");
      return;
    }

    const followRequest: FollowRequest = { uid };

    try {
      // 현재 사용자가 로그인된 상태에서의 토큰이나 인증 정보는 Context나 Props로 받아올 수 있음
      const response = await axiosInstance.post("/api/follow", followRequest, {
        withCredentials: true, // 인증 쿠키 등을 보낼 경우 설정
      });

      if (response.status === 204) {
        setMessage("성공적으로 팔로우했습니다.");
        setFollowingCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem("followingCount", newCount.toString());
          return newCount;
        });

        setFollowCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem("followCount", newCount.toString());
          return newCount;
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage("사용자를 찾을 수 없습니다.");
      } else if (error.response && error.response.status === 400) {
        setMessage("이미 팔로우 중입니다.");
      } else {
        setMessage("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <S.Background>
      
      <S.CircleContainer>
        <S.Circle
          size="800px"
          top="70%"
          left="35%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #F12FBB 0%, #B2EA6A 100%)"
        />
        
        <S.Circle
          size="800px"
          top="50%"
          left="80%"
          translateX="-50%"
          translateY="-50%"
          gradient="linear-gradient(135deg, #2B8DBE 0%, #C06AEA 100%)"
        />
        <S.Follow>
        <h2>팔로우 사용자 UID 입력</h2>
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="사용자 UID 입력"
        />
        <button onClick={handleFollow}>팔로우</button>
        {message && <p>{message}</p>}
      </S.Follow>
      </S.CircleContainer>
      <S.DotNavWrapper>
        <DotNav />
      </S.DotNavWrapper>
    </S.Background>
  );
}

export default Home;
