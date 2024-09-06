import axios from 'axios';

// Axios 기본 설정
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true, // 쿠키가 필요한 경우 설정
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // 엑세스 토큰을 로컬 스토리지에서 가져옴
        
        if (token) {
            config.headers['Authorization-Access'] = `Bearer ${token}`; // 엑세스 토큰을 헤더에 추가
            console.log('엑세스 토큰이 요청에 포함됩니다:', token);  // 엑세스 토큰 콘솔 출력
        } else {
            console.log('엑세스 토큰이 없습니다.');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;