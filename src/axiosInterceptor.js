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
        // 로컬스토리지에서 토큰을 가져옴
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            config.headers['Authorization-Access'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 쿠키에 리프레시 토큰을 저장하는 함수
function saveRefreshTokenToCookie(refreshToken) {
    document.cookie = `Authorization-Refresh=${refreshToken}; path=/; secure; samesite=strict`;
}

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        // 응답 헤더에서 리프레시 토큰을 가져와서 쿠키에 저장
        const refreshToken = response.headers['Authorization-Refresh'];
        if (refreshToken) {
            saveRefreshTokenToCookie(refreshToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            // 토큰 만료 처리
            if (error.response.status === 401 && error.response.data.code === 'SAT8') {
                const refreshToken = getCookie('Authorization-Refresh');
                try {
                    const response = await axios.post(
                        'http://localhost:8080/auth/reissue',
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization-Refresh': `Bearer ${refreshToken}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        const newAccessToken = response.headers['Authorization-Access'].split(' ')[1];
                        localStorage.setItem('accessToken', newAccessToken);

                        // 새로 발급받은 리프레시 토큰을 쿠키에 저장
                        const newRefreshToken = response.headers['Authorization-Refresh'];
                        if (newRefreshToken) {
                            saveRefreshTokenToCookie(newRefreshToken);
                        }

                        originalRequest.headers['Authorization-Access'] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (error) {
                    console.error('토큰 갱신 오류', error);
                    localStorage.removeItem('accessToken');
                    document.cookie = 'Authorization-Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear the refresh token
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;