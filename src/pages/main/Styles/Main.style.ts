import styled from "styled-components";

export const Main = styled.div`
    width: calc(100%-280px);
    height: 100%;
    display: flex;
    z-index: 1;
    flex-direction: column;
    background: #080808;

    @media (max-width: 768px) {
        width: 100%;
        height:100%;
        position:relative;
    }
`;

// Firework
export const Canvas = styled.canvas`
    position:fixed;
    top:0;
    left:0;
    z-index:0;
`


// Search part
export const SearchForm = styled.div`
    width: 100%;
    height: 350px;
    position: relative;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    

    @media (max-width:768px){
        width:100%;
        height:250px;
    }
`;
export const SearchInput = styled.input`
    width: 60%;
    height: 60px;
    position: absolute;
    top: 150px;
    left: 50%; /* 수평 중앙 정렬 */
    transform: translateX(-50%); /* 수평 중앙 정렬 */
    padding: 0 25px;
    z-index: 1;
    
    border-radius: 30px;
    border: 2px solid #333;
    font-size: 25px;
    background: #191919;
    color: #d9d9d9;
    

    @media (max-width: 768px) {
        position: relative;
        top:0;
        width: 70%;
        font-size: 20px;
        left: auto; /* 작은 화면에서 left 해제 */
        transform: none; /* 작은 화면에서 중앙 정렬 해제 */
    }
`;

// Blog part
export const BlogForm = styled.div`
    width: 100%;
    height: 400px;
    position:relative;
    margin:0 auto;

    z-index:1;
    display:flex;
    white-space: nowrap;

    @media (max-width:768px) {
    }
`;

export const BlogContent = styled.div`
    min-width: 30%;
    height:100%;
    background-color: #080808;
    border: 1px solid white;
    display:flex;
    font-size: 2em;
    justify-content: center;
    align-items:center;
    color:#fff;
`;

export const container = styled.div`
    width:100%;
    height:400px;
    left:50%;
    transform: translateX(-50%);
    position:relative;
    justify-content:center;
    align-items:center;
    margin:0 auto;

`