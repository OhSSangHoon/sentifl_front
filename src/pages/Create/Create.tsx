import JSZip from 'jszip';
import { useEffect, useState } from 'react';
import Editor from '../../Editor/MarkdownEditor';
import { deleteFromS3, downloadFromS3 } from '../../services/s3Service';
import * as S from './Styles/Create.style';

function Create() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTempSave, setHasTempSave] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [initialDelta, setInitialDelta] = useState<any>(null);
    const [images, setImages] = useState<Array<{ imageName: string; imageUrl: string }>>([]);


    useEffect(() => {
        const checkForTempSave = async () => {
            try {
                const tempSaveBlob = await downloadFromS3('images/tempSaved.zip');
                if (tempSaveBlob) {
                    // 다운로드한 후 바로 삭제
                    await deleteFromS3('images/tempSaved.zip');
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
    
        const loadEditorContentFromZip = async (zipBlob: Blob) => {
            const zip = await JSZip.loadAsync(zipBlob);
            const contentJsonFile = zip.file("content.json");
    
            if (contentJsonFile) {
                const contentJson = await contentJsonFile.async("string");
                const jsonData = JSON.parse(contentJson);
    
                setTitle(jsonData.title);
                const editorDelta = JSON.parse(jsonData.content);
                setInitialDelta(editorDelta);
    
                const imageFiles = Object.keys(zip.files).filter(name => name.startsWith('image') && (name.endsWith('.jpg') || name.endsWith('.png')));
                const imagePromises = imageFiles.map(async (imageName) => {
                    const imageBlob = await zip.file(imageName)?.async("blob");
                    if (imageBlob) {
                        const imageUrl = URL.createObjectURL(imageBlob);
                        return { imageName, imageUrl };
                    }
                    return null;
                });
    
                const images = await Promise.all(imagePromises);
                setImages(images.filter(image => image !== null) as Array<{ imageName: string; imageUrl: string }>);
            }
        };
    
        checkForTempSave();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
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