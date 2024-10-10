import { useEffect, useState } from 'react';
import { useAuth } from "../../AuthProvider";
import MarkdownEditor from '../../Editor/MarkdownEditor';
import { deleteFromS3, downloadFromS3 } from '../../services/s3Service';
import * as S from './Styles/Create.style';

function Create() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTempSave, setHasTempSave] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [initialDelta, setInitialDelta] = useState<any>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [images, setImages] = useState<Array<{ imageName: string; imageUrl: string }>>([]);
    const [hashTag, setHashTag] = useState<string>('');
    const { uid } = useAuth();

    useEffect(() => {
        const checkForTempSave = async () => {
            try {
                const tempSaveBlob = await downloadFromS3(`${uid}/temp/tempSaved.json`);
                if (tempSaveBlob) {
                    // 다운로드한 후 바로 삭제
                    await deleteFromS3(`${uid}/temp/tempSaved.json`);
                    setHasTempSave(true);
                    const userConfirmed = window.confirm('임시 저장된 파일이 있습니다. 계속하시겠습니까?');
                    if (userConfirmed) {
                        await loadEditorContentFromZip(tempSaveBlob);
                    } else {
                        setHasTempSave(false);
                    }
                } else {
                    console.log("임시 저장 파일이 없습니다.");
                    setHasTempSave(false);
                }
            } catch (error) {
                console.error("임시 저장 파일을 확인하는 중 오류가 발생했습니다:", error);
                setHasTempSave(false);
            } finally {
                setIsLoading(false);
            }
        };
    
        const loadEditorContentFromZip = async (jsonBlob: Blob) => {
            const jsonText = await jsonBlob.text();
            const jsonData = JSON.parse(jsonText);
        
            setTitle(jsonData.title);

            const deltaContent = JSON.parse(jsonData.content);
            setInitialDelta(deltaContent); // Delta 형식을 그대로 저장

            if (jsonData.thumbnailUrl) {
                setThumbnailUrl(jsonData.thumbnailUrl);
            }

            if (jsonData.hashTag){
                setHashTag(jsonData.hashTag);
            }
        };
        
        if(!hasTempSave){
            checkForTempSave();
        }
    }, [uid, hasTempSave]);

    if (isLoading) {
        return <></>;
    }

    return (
        <S.Main>
            <MarkdownEditor
                loadFromTempSave={hasTempSave}
                initialDelta={initialDelta}
                title={title}
                setTitle={setTitle}
                images={images}
                thumbnailUrl={thumbnailUrl}
                isCreatePage={true}
                hashTag={hashTag}
                setHashTag={setHashTag}
            />
        </S.Main>
    );
}

export default Create;