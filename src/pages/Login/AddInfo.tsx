import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInterceptor';

const AddInfo = () => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axiosInstance.get('/auth/me')
            .then(response => {
                const accessToken = response.headers['authorization-access'];  // 응답 헤더에서 토큰 가져오기
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);  // 토큰을 localStorage에 저장
                    console.log('엑세스 토큰 저장 완료:', accessToken);
                } else {
                    console.error('엑세스 토큰을 찾을 수 없습니다.');
                }
            })
            .catch(error => {
                console.error('사용자 정보 가져오기 실패:', error);
            });
    }, []);
    

    const handleAddInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // 엑세스 토큰은 axiosInstance에서 자동으로 추가됨
        try {
            axiosInstance.post('auth/add-info', { uid })
                .then(() => {
                    alert('추가 정보가 성공적으로 입력되었습니다.');
                })
                .catch(error => {
                    console.error('추가 정보 입력 실패:', error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p>사용자 이메일: {email}</p>  {/* 이메일 화면에 표시 */}
            <form onSubmit={handleAddInfo}>
                <div>
                    <label>UID</label>
                    <input type="text" value={uid} onChange={(e) => setUid(e.target.value)} required />
                </div>
                <button type="submit">정보 제출</button>
            </form>
        </div>
    );
};

export default AddInfo;