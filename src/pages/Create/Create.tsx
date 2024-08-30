import { useEffect, useState } from 'react';
import Editor from '../../Editor/MarkdownEditor';
import { deleteFromS3, downloadFromS3 } from '../../services/s3Service';
import * as S from './Styles/Create.style';

function Create() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTempSave, setHasTempSave] = useState(false);

    useEffect(() => {
        const checkForTempSave = async () => {
            try {
                const tempSaveBlob = await downloadFromS3('images/tempSaved.zip');
                if (tempSaveBlob) {
                    // 파일이 존재하면 알림을 띄우고 상태를 업데이트
                    setHasTempSave(true);
                    const userConfirmed = window.confirm('임시 저장된 파일이 있습니다. 계속하시겠습니까?');
                    if (!userConfirmed) {
                        await deleteFromS3('images/tempSaved.zip');
                        setHasTempSave(false);
                    }
                } else {
                    // 파일이 없으면 상태를 false로 설정
                    setHasTempSave(false);
                }
            } catch (error) {
                // 파일 다운로드 오류 발생 시 상태를 false로 설정
                setHasTempSave(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkForTempSave();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <S.Main>
            <Editor loadFromTempSave={hasTempSave} />
        </S.Main>
    );
}

export default Create;