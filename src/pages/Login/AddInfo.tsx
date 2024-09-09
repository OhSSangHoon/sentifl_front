import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/Login.styles";

const AddInfo = () => {
  const [uid, setUid] = useState("");
  const [nickname, setNickname] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("accessToken");

    // 토큰을 쿠키에 저장
    if (accessToken) {
      document.cookie = `Authorization-Access=${accessToken};`;
    } else {
      console.error("토큰이 없습니다.");
    }
  }, [location]);

  const handleAddInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // uid와 nickname을 백엔드로 전송
    axiosInstance
      .post("/auth/add-info", { uid, nickName: nickname })
      .then(() => {
        alert("추가 정보가 성공적으로 입력되었습니다.");
        navigate("/auth/success"); // 성공적으로 입력 후 success 페이지로 리디렉션
      })
      .catch((error) => {
        console.error("추가 정보 입력 실패:", error.response?.data || error);
        if (error.response?.status === 409) {
          alert("UID가 이미 존재합니다. 다른 UID를 입력해주세요.");
        } else {
          alert("추가 정보 입력 중 오류가 발생했습니다.");
          console.error(error);
        }
      });
  };

  return (
    <S.Container>
      <S.Uid>
        <h1>추가 정보 입력</h1>
        <form onSubmit={handleAddInfo}>
          <div>
            <label>UID</label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          <div>
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <button type="submit">정보 제출</button>
        </form>
      </S.Uid>
    </S.Container>
  );
};

export default AddInfo;
