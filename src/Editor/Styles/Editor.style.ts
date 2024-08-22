import styled from "styled-components";

/* MarkdownEditor.css */
export const EditorWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
`;

export const EditorContainer = styled.div`
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SaveButton = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const PreviewContainer = styled.div`
    flex: 1;
    padding: 20px;
    background:#fff;
    overflow-y: auto;
    box-sizing: border-box;

    & > div {
        width:100%;
        height:100%;
        box-sizing: border-box;
    }
`;