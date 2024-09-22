import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization-Access"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적이면 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러가 발생하고 원래 요청이 이미 재시도된 경우가 아니라면
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 새로운 액세스 토큰 요청 (reissue)
        const tokenResponse = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/reissue`
        );

        // 응답 헤더에서 새로운 액세스 토큰 확인
        const newAccessTokenHeader =
          tokenResponse.headers["authorization-access"];

        if (newAccessTokenHeader) {
          const newAccessToken = newAccessTokenHeader.split(" ")[1];
          localStorage.setItem("accessToken", newAccessToken);

          // 원래 요청의 Authorization 헤더를 새 토큰으로 업데이트
          originalRequest.headers[
            "Authorization-Access"
          ] = `Bearer ${newAccessToken}`;

          // 원래 요청을 다시 보냄
          return axiosInstance(originalRequest);
        } else {
          console.error("Authorization-Access header missing");
        }
      } catch (tokenError) {
        console.error("Token reissue failed", tokenError);
        localStorage.removeItem("accessToken");
        // window.location.href = '/login'; // 필요시 로그인으로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
