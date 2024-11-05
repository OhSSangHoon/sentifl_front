import styled from "styled-components";

interface HashProps {
    size: number;
}


export const Container = styled.div`
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;


export const HashtagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const HashTitle = styled.div`
    margin:0 auto;
    margin-top: 50px;
    font-size: 4.5em;
    font-weight: 100;
`

export const HashInt = styled.div`
    width: 100%;
    color: #fff;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 100px;
    text-align: center;
    font-size: 1.2em;
    font-weight: 100;
`

export const Hash = styled.div<HashProps>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: none;
    border: 1px solid #fff;
    color: white;
    margin: 10px;
    cursor: pointer;
    width: ${(props) => (props.size * 10) + 'px'}; // 빈도수 기반 크기 조정
    height: ${(props) => (props.size * 10) + 'px'}; // 빈도수 기반 크기 조정
    font-size: ${(props) => (props.size * 2) + 'px'}; // 빈도수 기반 글자 크기 조정

    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
        border:1px solid #fff;
        background: #fff;
        color: #000;
    }
`;

export const HashGroup = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
`;