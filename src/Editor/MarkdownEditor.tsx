import AWS from 'aws-sdk';
import JSZip from 'jszip';
import { marked } from 'marked';
import 'quill/dist/quill.bubble.css';
// import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { ImageResize } from "quill-image-resize-module-ts";
import React, { useEffect, useRef, useState } from 'react';
import TurndownService from 'turndown';
import { deleteFromS3, downloadFromS3, uploadTempZipToS3, uploadToS3 } from '../services/s3Service';
import * as S from './Styles/Editor.style';

Quill.register('modules/imageResize', ImageResize);


AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const MarkdownEditor: React.FC<{ loadFromTempSave: boolean }> = ({ loadFromTempSave }) => {
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<Array<{ src: string }>>([]);
    const quillRef = useRef<Quill | null>(null);
    const turndownService = new TurndownService();


    useEffect(() => {

        const quill = new Quill('#editor', {
            theme: 'bubble',
            modules: {
                toolbar: [
                    [{ 'header': 2}],
                    [{ 'header': 3}],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image'],
                    ['clean']
                ],
                imageResize: true
            }
        });
        quillRef.current = quill;

    }, [loadFromTempSave]);

    
    const handleImageInsert = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                try {
                    const imgUrl = await handleImageUpload(file);  // imgUrl을 비동기적으로 처리
                    const quill = quillRef.current;
                    if (quill) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, 'image', imgUrl);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };
        fileInput.click();
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };

        return new Promise<string>((resolve, reject) => {
            reader.onloadend = async () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    const ctx = canvas.getContext('2d');
                    
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, 300, 300);
                        canvas.toBlob(async (blob) => {
                            if (blob) {
                                const resizedFile = new File([blob], file.name, { type: file.type });
                                const imageUrl = await uploadToS3(resizedFile);
                                setImages(prevImages => [...prevImages, { src: imageUrl }]);
                                resolve(imageUrl);
                            }
                        }, 'image/jpeg');
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSave = async () => {
        try {
            const quill = quillRef.current;
            if (!quill) return;

            const htmlContent = quill.root.innerHTML;
            const markdownContent = turndownService.turndown(htmlContent);

            const zip = new JSZip();
            zip.file("text.md", `# ${title}\n\n${markdownContent}`);

            for (let i = 0; i < images.length; i++) {
                const blob = await fetch(images[i].src).then(res => res.blob());
                zip.file(`image-${i + 1}.jpg`, blob);
            }

            const safeTitle = title.replace(/[^a-zA-Z0-9-_ ]/g, '');
            const zipBlob = await zip.generateAsync({ type: "blob" });
            const zipFile = new File([zipBlob], `${safeTitle}.zip`, { type: "application/zip" });

            await uploadToS3(zipFile);

            alert('저장 완료');
            setImages([]);
            setTimeout(() => window.location.href = '/', 500);
        } catch (error) {
            console.error('저장 중 오류 발생:', error);
            alert('저장 중 오류 발생');
        }
    };

    const handleTemporarySave = async () => {
        try {
            const quill = quillRef.current;
            if (!quill) return;

            const htmlContent = quill.root.innerHTML;
            const markdownContent = turndownService.turndown(htmlContent);

            const zip = new JSZip();
            zip.file("text.md", `# ${title}\n\n${markdownContent}`);

            for (let i = 0; i < images.length; i++) {
                const blob = await fetch(images[i].src).then(res => res.blob());
                zip.file(`image-${i + 1}.jpg`, blob);
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            const zipFile = new File([zipBlob], `tempSaved.zip`, { type: "application/zip" });

            await uploadTempZipToS3(zipFile);
            alert('임시 저장 완료');
            setTimeout(() => window.location.href = '/', 500);
        } catch (error) {
            console.error('임시 저장 중 오류 발생:', error);
            alert('임시 저장 중 오류 발생');
        }
    };

    const handleLoadFromS3 = async () => {
        try {
            const zipBlob = await downloadFromS3('images/tempSaved.zip');
            if (zipBlob) {
                const zip = await JSZip.loadAsync(zipBlob);
                const markdownContent = await zip.file("text.md")?.async("string");
                const imageFiles: Array<{ src: string }> = [];

                await Promise.all(Object.keys(zip.files).map(async (relativePath) => {
                    const file = zip.file(relativePath);
                    if (file && relativePath.startsWith("image-")) {
                        const blob = await file.async("blob");
                        const imageUrl = URL.createObjectURL(blob);
                        imageFiles.push({ src: imageUrl });
                    }
                }));

                if (markdownContent) {
                    const htmlContent = await marked(markdownContent); // await을 사용하여 Promise 해결
                    const quill = quillRef.current;
                    if (quill) {
                        quill.clipboard.dangerouslyPasteHTML(htmlContent); // 변환된 HTML을 Quill 에디터에 로드
                    }
                }

                setImages(imageFiles);
                await deleteFromS3('images/tempSaved.zip');
            } else {
                console.warn('No tempSaved.zip file found in S3.');
            }
        } catch (error) {
            console.log('S3 파일을 불러오거나 삭제하는 중 오류 발생:', error);
            alert('파일을 불러오거나 삭제하는 중 오류 발생');
        }
    };

    return (
        <S.EditorWrapper>
            <S.Title
                type="text"
                placeholder="제목을 작성해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <S.EditorContainer>
                <S.Editor/>
            </S.EditorContainer>
            <S.SaveBtn>
                <button onClick={handleSave}>저장</button>
                <button onClick={handleTemporarySave}>임시저장</button>
            </S.SaveBtn>
        </S.EditorWrapper>
    );
};

export default MarkdownEditor;