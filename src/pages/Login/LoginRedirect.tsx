import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');
    
        if (token) {
            localStorage.setItem('accessToken', token);
            navigate('/AddInfo'); // 홈 페이지로 이동
        } else {
            navigate('/login'); // 로그인 페이지로 이동
        }
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default LoginRedirect;