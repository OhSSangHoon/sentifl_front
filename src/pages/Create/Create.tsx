import { useEffect, useState } from 'react';
import { useAuth } from "../../AuthProvider";
import Editor from '../../Editor/MarkdownEditor';
import { deleteFromS3, downloadFromS3 } from '../../services/s3Service';
import * as S from './Styles/Create.style';

function Create() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTempSave, setHasTempSave] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [initialDelta, setInitialDelta] = useState<any>(null);
    const [images, setImages] = useState<Array<{ imageName: string; imageUrl: string }>>([]);
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
                    setHasTempSave(false);
                }
            } catch (error) {
                setHasTempSave(false);
            } finally {
                setIsLoading(false);
            }
        };
    
        const loadEditorContentFromZip = async (jsonBlob: Blob) => {
            const jsonText = await jsonBlob.text();
            const jsonData = JSON.parse(jsonText);
        
            setTitle(jsonData.title);
            const editorDelta = JSON.parse(jsonData.content);
            setInitialDelta(editorDelta);
        };
        
    
        checkForTempSave();
    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <S.Main>
            <Editor
                loadFromTempSave={hasTempSave}
                initialDelta={initialDelta}
                title={title}
                setTitle={setTitle}
                images={images}
            />
        </S.Main>
    );
}

export default Create;