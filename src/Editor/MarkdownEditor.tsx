import AWS from 'aws-sdk';
import React, { useEffect, useState } from 'react';
import ReactMde, { Command } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';
import { uploadToS3 } from '../services/s3Service';
import * as S from './Styles/Editor.style';

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const MarkdownEditor: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    const [images, setImages] = useState<Array<{ src: string, size: { width: number, height: number } }>>([]);

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    });

    // 로컬 스토리지에서 저장된 데이터 가져오기
    useEffect(() => {
        const savedContent = localStorage.getItem('markdownContent');
        const savedImages = localStorage.getItem('images');

        if (savedContent) {
            setValue(savedContent);
        }

        if (savedImages) {
            setImages(JSON.parse(savedImages));
        }
    }, []);

    // 자동 저장 기능
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem('markdownContent', value);
            localStorage.setItem('images', JSON.stringify(images));
        }, 2000);

        return () => clearInterval(interval);
    }, [value, images]);

    const handleImageUpload = async (file: File) => {
        const imageUrl = await uploadToS3(file);
        setValue((prevValue) => `${prevValue}\n![Image description](${imageUrl})`);
        setImages(prevImages => [...prevImages, { src: imageUrl, size: { width: 300, height: 300 } }]);
    };

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = images[index].size.width;
        const startHeight = images[index].size.height;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            const newHeight = startHeight + (moveEvent.clientY - startY);
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = { ...newImages[index], size: { width: newWidth, height: newHeight } };
                return newImages;
            });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const insertImageCommand: Command = {
        buttonProps: { 'aria-label': 'Insert image' },
        icon: () => <span role="img" aria-label="insert image">📁</span>,
        execute: ({ textApi }) => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = async () => {
                if (fileInput.files && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    try {
                        handleImageUpload(file);
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                }
            };
            fileInput.click();
        }
    };

    const handleSave = async () => {
        for (let i = 0; i < images.length; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = images[i].size.width;
            canvas.height = images[i].size.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = images[i].src;
                img.onload = async () => {
                    ctx.drawImage(img, 0, 0, images[i].size.width, images[i].size.height);
                    canvas.toBlob(async (blob) => {
                        if (blob) {
                            // Blob을 File로 변환하여 S3에 업로드
                            const file = new File([blob], `processed-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
                            await uploadToS3(file);
                        }
                    }, 'image/jpeg');
                };
            }
        }

        localStorage.clear();

        window.location.href = '/';
    };


    const handleClearLocalStorage = () => {
        localStorage.removeItem('markdownContent');
        localStorage.removeItem('imageSrc');
        localStorage.removeItem('imageSize');
        window.location.reload();  // 새로고침하여 초기 상태로 복구
    };

    return (
        <S.EditorWrapper>
            <S.EditorContainer>
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    commands={{ image: insertImageCommand }}
                    toolbarCommands={[['bold', 'italic', 'header', 'image']]}
                />
                <button onClick={handleSave}>Save</button> {/* Save 버튼 */}
                <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
            </S.EditorContainer>
            <S.PreviewContainer>
                {images.map((image, index) => (
                    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                            src={image.src}
                            alt="Uploaded"
                            style={{ width: image.size.width, height: image.size.height }}
                            onMouseDown={(e) => handleMouseDown(index, e)}
                        />
                        <div
                            style={{
                                position: 'relative',
                                bottom: 0,
                                right: 0,
                                width: 0,
                                height: 0,
                                backgroundColor: 'gray',
                                cursor: 'nwse-resize',
                            }}
                        />
                    </div>
                ))}
            </S.PreviewContainer>
        </S.EditorWrapper>
    );
};

export default MarkdownEditor;