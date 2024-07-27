import styled from "styled-components";

export const SideBar = styled.div`
    width: 280px;
    position: fixed;
    height: 100%;
    background: #0a0a0a;
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: space-between; /* 상단과 하단에 요소 배치 */
`;

export const Logo = styled.div`
    width: 100%;
    height: 100px;
`;

export const Menu = styled.div`
    width: 100%;
    flex-grow: 0.8; /* 남은 공간을 차지 */
`;


export const Menus = styled.ul`
    width:100%;
    height:100%;
    text-decoration:none;
    text-align:center;
    font-size:17px;
    position:relative;
    padding: 0;
    margin: 0;
    color:#fff;


    li {
        position:relative;
        height:12%;
        cursor:pointer;
        transition: color 0.3s ease;
    }

    li:before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        border-left: 5px solid transparent;
        transition: border-color 0.4s ease;
    }

    li:hover {
        color:#CCC;
    }

    li:hover::before {
        border-left:5px solid #d9d9d9;

    }
`

export const Sign = styled.div`
    width: 100%;
    height: 250px;
`;

export const SignUl = styled.ul`
    width:100%;
    height:100%;
    text-decoration:none;
    text-align:center;
    position:relative;
    padding: 0;
    margin: 0;
    color:#fff;

    li {
        margin:145px 0;
        position:relative;
        cursor:pointer;
        transition: color 0.3s ease;
    }

    li:before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        border-left: 5px solid transparent;
        transition: border-color 0.3s ease;
    }

    li:hover {
        color:#CCC;
    }

    li:hover::before {
        border-left:5px solid #d9d9d9;
    }
`

export const SignBtn = styled.button`
    width:61%;
    height:50px;
    font-weight:700;
    border-radius:5px;
    border:none;
    cursor:pointer;
    background:#fff;
    transition: background-color 0.3s ease;


    &:hover {
        background:#aaa;
    }
`

// Sign In Popup
export const Popup = styled.div`
    position:fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
    z-index:1;
    background: rgba(8, 8, 8, 0.8);
`

export const DelBtn = styled.button`
    width:8%;
    height:40px;
    position:absolute;
    text-align:center;
    z-index: 1;
    right:20px;
    border: none;
    border-radius: 5px;
    background: none;
    color: #fff;
    font-size:25px;
    cursor: pointer;

    transition: background 0.1s ease;

    &:hover {
        background:#1f1f1f;
    }
`;


export const SignForm = styled.div`
    position:relative;
    margin:0 auto;
    width:25%;
    height:61%;
    background:#191919;
    z-index:1;
    padding:20px 30px;
    border-radius:15px;
    color:#fff;

    h1 {
        font-weight:400;
        font-size:40px;
        margin-top:10px;
    }

    p {
        font-weight:300;
        margin:15px 0;
        font-size:20px;
    }
`

export const Signup = styled.div`
    width:100%;
    height:45%;
    border-bottom:1px solid #d9d9d9;
`

export const Signdown = styled.div`
    margin:30px 0;
    width:100%;
    height:45%;
`

export const SocialBtn = styled.div`
    margin:0 6px;
    width:30%;
    height:30%;
    float:left;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:5px;
    border:1px solid #333;
    cursor:pointer;


    img {
        width:20%;
    }

    &:hover {
        background:#1f1f1f;
    }


`