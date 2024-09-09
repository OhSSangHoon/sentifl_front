import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //     const params = queryString.parse(window.location.search);

  //     const accessToken = Array.isArray(params.accessToken) ? params.accessToken[0] : params.accessToken;
  //     const refreshToken = Array.isArray(params.refreshToken) ? params.refreshToken[0] : params.refreshToken;

  //     console.log('Query params:', params);

  //     const uid = Array.isArray(params.uid) ? params.uid[0] : params.uid;

  //     const nickName = Array.isArray(params.nickName)
  //         ? decodeURIComponent(params.nickName[0] || '')
  //         : decodeURIComponent(params.nickName || '');
  //     const profile = Array.isArray(params.profile)
  //         ? decodeURIComponent(params.profile[0] || '')
  //         : decodeURIComponent(params.profile || '');

  //     console.log('UID:', uid);
  //     console.log('Nickname (Decoded):', nickName);
  //     console.log('Profile (Decoded):', profile);

  //     if(accessToken && refreshToken){
  //         localStorage.setItem('accessToken', accessToken);
  //         localStorage.setItem('refreshToken', refreshToken);
  //     }

  //     if (uid && nickName && profile) {
  //         navigate('/');
  //     } else {
  //         console.error('Missing parameters');
  //     }
  // }, [navigate]);

  return (
    <div>
      <h1>로그인 성공!</h1>
      <p>대시보드로 이동 중...</p>
    </div>
  );
};

export default SuccessPage;
