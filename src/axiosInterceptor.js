import axios from 'axios';

// 쿠키에서 특정 이름의 값을 추출하는 함수 정의
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}

// axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true, // 쿠키를 포함하여 요청
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    (config) => {
        // 우선 쿠키에서 토큰을 가져옴
        const accessToken = getCookie('Authorization-Access') || localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken) {
            config.headers['Authorization-Access'] = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            config.headers['Authorization-Refresh'] = `Bearer ${refreshToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            // 토큰 만료 처리
            if (error.response.status === 401 && error.response.data.code === 'SAT8') {
                try {
                    // 토큰 재발급 엔드포인트 호출
                    const response = await axios.post(
                        'http://localhost:8080/auth/reissue',
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.status === 200) {
                        // 새로 발급받은 토큰을 로컬 스토리지에 저장
                        const newAccessToken = response.headers['authorization-access'].split(' ')[1];
                        const newRefreshToken = response.headers['authorization-refresh'].split(' ')[1];

                        localStorage.setItem('accessToken', newAccessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);

                        // 원래 요청의 헤더를 새 토큰으로 업데이트
                        originalRequest.headers['Authorization-Access'] = `Bearer ${newAccessToken}`;
                        originalRequest.headers['Authorization-Refresh'] = `Bearer ${newRefreshToken}`;

                        // 원래 요청 재시도
                        return api(originalRequest);
                    }
                } catch (error) {
                    console.error('토큰 갱신 오류', error);
                    // 인증 오류가 발생하면 로그아웃 처리
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;