import styled from 'styled-components';

export const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
`;


export const TitleWrapper = styled.div`
    height:400px;
    background-size: cover;
    background-position: center;
    display: flex;
    flexDirection: column;
    position:relative;
`;


export const TitleInput = styled.input<{ hasThumbnail: boolean }>`
    width:100%;
    height:100%;
    background:${(props) => (props.hasThumbnail ? 'none' : '#111')};
    font-size: 20px;
    font-weight:bold;
    color:#fff;
    font-size:50px;
    padding:0 170px;
    padding-top:100px;
    border:none;

    &:focus {
        outline: none;
    }

    ::placeholder {
        color:#fff;
    }

`;

export const HashTagInput = styled.input`
    border:1px solid red;
`


export const ThumbnailWrapper = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    right:150px;
    bottom:10px;
    z-index:2;
    
    {
        object-fit: cover;
        border-radius: 8px;
    }
`;


export const ThumbnailImg = styled.img`
    width:35px;
    position: absolute;
    backgroundColor:#4CAF50;
    color: white;
    borderRadius: 4px;
    z-index:1;
`;


export const ThumbnailInput = styled.input`
    position: absolute;
    backgroundColor:#4CAF50;
    color: white;
    borderRadius: 4px;
    z-index:1;
    opacity:0;
`;


export const EditorContainer = styled.div`
    width: 100%;
    height: 100%;
    margin:0 auto;
    background: #080808;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    z-index:1;

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
    width:100%;
    height: 100%;
    display: flex;
    margin:0 auto;

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
        padding:100px 250px;
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
    position:absolute;
    right:100px;
    top:10px;
    display:flex;
    gap:10px;
    z-index:2;
    
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