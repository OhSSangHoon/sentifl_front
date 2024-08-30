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

export const Title = styled.input`
    height:300px;
    padding:100px;
    padding-bottom:0;
    font-size: 2.5em;
    font-weight:bold;
    color: #fff;
    background: #121212;
    border: none;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
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
    height: 92%;
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
    position:fixed;
    right:75px;

    button{
        width:100px;
        height:45px;
        border-radius:30px;
        margin:25px 5px;
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