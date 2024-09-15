import styled from 'styled-components';

export const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90%;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
`;

export const TitleWrapper = styled.div`
    height:500px;
    background-size: cover;
    background-position: center;
    display: flex;
    flexDirection: column;
    position:relative;
`;

export const TitleInput = styled.input`
    width:100%;
    height:100%;
    background:none;
    font-size: 20px;
    color:#fff;
    font-size:50px;
    border:1px solid blue;
    padding:0 100px;

    &:focus {
        outline: none;
    
`;

export const ThumbnailInput = styled.input`
    position: absolute;
    backgroundColor:#4CAF50;
    color: white;
    borderRadius: 4px;
    cursor:pointer;
    z-index:1;
    
`;


export const EditorContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: #080808;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }

    scrollbar-width: none; /* 파이어폭스에서 스크롤바를 숨기기 */
    -ms-overflow-style: none;  /* IE와 Edge에서 스크롤바를 숨기기 */
`;

export const Editor = styled.div.attrs({
    id: 'editor',
})`
    border:1px solid red;
    height: 100%;
    display: flex;

    .ql-align-center{
        display:none;
    }

    .quill-editor {
        p {
            overflow-y: scroll;
        }
    }

    .ql-snow{
        border:1px solid red;
    }

    .ql-editor {
        color:#fff;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        padding:20px 100px;
        box-sizing: border-box;
        font-size:1.5em;

        /* 스크롤바 숨기기 */
        &::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }

        scrollbar-width: none; /* 파이어폭스에서 스크롤바를 숨기기 */
        -ms-overflow-style: none;  /* IE와 Edge에서 스크롤바를 숨기기 */
    }

    input {
        display: none;
    }
`;


export const SaveBtn = styled.div`
    height:10%;
    position:relative;
    
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }

    button{
        right:10px;
        width:100px;
        height:45px;
        border-radius:30px;
        border:none;
        background:#1E1E1E;
        color:#fff;
        font-size:1em;
        cursor:pointer;
        transition: 0.1s ease-in-out 0.1s;

    }:hover{
        background:#363636;
    }

    button:nth-child(2){
        width:150px;
    }
`