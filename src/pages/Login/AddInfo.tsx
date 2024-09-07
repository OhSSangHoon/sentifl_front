import { AxiosError } from 'axios';
import { useState } from 'react';
import axiosInstance from '../../axiosInterceptor';
import * as S from "./Styles/Login.styles";

const AddInfo = () => {
    const [uid, setUid] = useState('');
    const [nickname, setNickname] = useState('');

    const handleAddInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosInstance.post('/auth/add-info', { uid, nickName: nickname })
            .then(() => {
                alert('추가 정보가 성공적으로 입력되었습니다.');
                window.location.href = "/";  // 성공적으로 입력 후 홈 페이지로 리디렉션
            })
            .catch((error: AxiosError) => {
                console.error('추가 정보 입력 실패:', error.response?.data || error);
                alert('추가 정보 입력 중 오류가 발생했습니다.');
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