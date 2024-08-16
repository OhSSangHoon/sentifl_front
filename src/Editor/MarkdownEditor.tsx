import React, { useEffect, useState } from 'react';
import ReactMde, { Command } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';
import * as S from "./Styles/Editor.style";

const MarkdownEditor: React.FC = () => {
    const [value, setValue] = useState('');
    const [images, setImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // 임시 저장된 데이터를 로드
        const savedData = JSON.parse(localStorage.getItem('tempContent') || '{}');
        if (savedData.content) setValue(savedData.content);
        if (savedData.images) setImages(savedData.images);
    }, []);

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const insertImageCommand: Command = {
        buttonProps: { "aria-label": "Insert image" },
        icon: () => <span>📁</span>,
        execute: async ({ initialState, textApi }) => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = async () => {
                if (fileInput.files && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const base64 = await convertFileToBase64(file);

                    const imageKey = `image-${Date.now()}`;

                    setImages(prevImages => ({
                        ...prevImages,
                        [imageKey]: base64
                    }));

                    textApi.replaceSelection(`![Image description](${imageKey})`);
                }
            };
            fileInput.click();
        }
    };

    const getUpdatedMarkdown = (markdown: string) => {
        return markdown.replace(/!\[Image description]\((.*?)\)/g, (match, key) => {
            const imageBase64 = images[key];
            return imageBase64 ? `![Image description](${imageBase64})` : match;
        });
    };

    const handleSave = () => {
        // 현재 에디터 상태를 로컬 스토리지에 임시 저장
        const tempData = {
            content: value,
            images: images
        };
        localStorage.setItem('tempContent', JSON.stringify(tempData));
        alert("임시 저장되었습니다!");
    };

    const handleClear = () => {
        // 로컬 스토리지에서 임시 저장된 데이터 삭제
        localStorage.removeItem('tempContent');
        setValue('');
        setImages({});
        alert("임시 저장된 데이터가 삭제되었습니다!");
    };

    return (
        <S.EditorWrapper>
            <S.EditorContainer>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flex: 1, marginRight: '10px' }}>
                        <ReactMde
                            value={value}
                            onChange={setValue}
                            generateMarkdownPreview={() => Promise.resolve(converter.makeHtml(getUpdatedMarkdown(value)))}
                            childProps={{
                                writeButton: {
                                    tabIndex: -1
                                }
                            }}
                            commands={{
                                image: insertImageCommand
                            }}
                            toolbarCommands={[["bold", "italic", "header", "image"]]}
                        />
                    </div>
                    <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(getUpdatedMarkdown(value)) }} />
                    </div>
                </div>
                <S.SaveButton onClick={handleSave}>
                    임시 저장
                </S.SaveButton>
                <S.SaveButton onClick={handleClear}>
                    임시 저장 삭제
                </S.SaveButton>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default MarkdownEditor;