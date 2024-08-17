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
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write"); // 현재 선택된 탭 상태 관리
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    });

    useEffect(() => {
        const savedContent = localStorage.getItem('markdownContent');
        if (savedContent) {
            setValue(savedContent);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('markdownContent', value);
    }, [value]);

    const handleImageUpload = async (file: File) => {
        const imageUrl = await uploadToS3(file);
        setValue((prevValue) => `${prevValue}\n![Image description](${imageUrl})`);
        setImageSrc(imageUrl);
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

    return (
        <S.EditorWrapper>
            <S.EditorContainer>
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab} // 현재 선택된 탭 전달
                    onTabChange={setSelectedTab} // 탭 변경 시 호출되는 핸들러 전달
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    commands={{ image: insertImageCommand }}
                    toolbarCommands={[['bold', 'italic', 'header', 'image']]}
                />
            </S.EditorContainer>
            <S.PreviewContainer>
                <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(value) }} />
            </S.PreviewContainer>
        </S.EditorWrapper>
    );
};

export default MarkdownEditor;