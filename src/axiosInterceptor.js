import axios from 'axios';

//axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true, // 쿠키를 포함하여 요청
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization-Access'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        const refreshToken = response.headers['Authorization-Refresh'];
        if (refreshToken) {
            saveRefreshTokenToCookie(refreshToken); // Refresh Token을 쿠키에 저장
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && error.response.data.code === 'SA7') {
            // 쿠키에서 리프레시 토큰 가져오기
            const refreshToken = getCookie('Authorization-Refresh');
            
            if (!refreshToken) {
                // 리프레시 토큰이 없으면 로그아웃 처리
                localStorage.removeItem('accessToken');
                // window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // 리프레시 토큰으로 엑세스 토큰 재발급 요청
                const response = await axios.post('http://localhost:8080/auth/reissue', {}, { withCredentials: true },);

                if (response.status === 200) {
                    // 새로운 엑세스 토큰을 받아 로컬 스토리지에 저장
                    const newAccessToken = response.headers['Authorization-Refresh'].split(' ')[1];
                    localStorage.setItem('accessToken', newAccessToken);
                    
                    // 새로운 엑세스 토큰을 사용하여 원래 요청을 재시도
                    originalRequest.headers['Authorization-Access'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (error) {
                // 토큰 재발급 실패 시 로그아웃 처리
                console.error('Token refresh error', error);
                localStorage.removeItem('accessToken');
                document.cookie = 'Authorization-Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                // window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);



// 쿠키에 Refresh Token 저장 함수
function saveRefreshTokenToCookie(refreshToken) {
    document.cookie = `Authorization-Refresh=${refreshToken}; path=/; SameSite=Strict;`;
}

console.log(getCookie('Authorization-Refresh'));

// 쿠키에서 특정 이름의 값을 추출하는 함수
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}



export default api;
