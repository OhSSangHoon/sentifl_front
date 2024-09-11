import queryString from 'query-string';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setAccessToken, setNickname, setUid, setProfileImage } = useAuth();

    useEffect(() => {
        const params = queryString.parse(window.location.search);

        const accessToken = Array.isArray(params.accessToken) ? params.accessToken[0] : params.accessToken;
        const refreshToken = Array.isArray(params.refreshToken) ? params.refreshToken[0] : params.refreshToken;
        const uid = Array.isArray(params.uid) ? params.uid[0] : params.uid;
        const nickName = Array.isArray(params.nickName) ? decodeURIComponent(params.nickName[0] || '') : decodeURIComponent(params.nickName || '');
        const profile = Array.isArray(params.profile) ? decodeURIComponent(params.profile[0] || '') : decodeURIComponent(params.profile || '');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken); // 로컬 스토리지에 저장
        }

        if (refreshToken) {
            document.cookie = `Authorization-Refresh=${refreshToken}; path=/; secure; HttpOnly; SameSite=Strict`; // 쿠키에 저장
        }

        if (uid && nickName && profile) {
            setIsLoggedIn(true);
            setUid(uid);
            setNickname(nickName);
            setProfileImage(profile);
            navigate('/'); // 리디렉션
        } else {
            console.error('Missing parameters');
        }
    }, [navigate, setIsLoggedIn, setAccessToken, setNickname]);

    return (
        <div>
            <h1>로그인 성공!</h1>
            <p>대시보드로 이동 중...</p>
        </div>
    );
};

export default SuccessPage;