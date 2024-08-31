import styled from "styled-components";

export const SideBar = styled.div`
  width: 280px;
  position: fixed;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 5;

  @media (max-width: 768px) {
    width: 100%;
    height: 450px;
    position: relative;
  }
`;

export const Logo = styled.div`
  width: 100%;
  height: 100px;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

export const Menu = styled.div`
  width: 100%;
  flex-grow: 0.8; /* 남은 공간을 차지 */
`;

export const Menus = styled.ul`
  width: 100%;
  height: 100%;
  text-decoration: none;
  text-align: center;
  font-size: 17px;
  position: relative;
  padding: 0;
  margin: 0;
  color: #fff;

  li {
    position: relative;
    height: 10%;
    cursor: pointer;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      height: 25%;
    }
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
    color: #ccc;
  }

  li:hover::before {
    border-left: 5px solid #d9d9d9;
  }
`;

export const Sign = styled.div`
  width: 100%;
  height: 250px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

export const SignUl = styled.ul`
  width: 100%;
  text-decoration: none;
  text-align: center;
  position: relative;
  top: 50%;
  padding: 0;
  margin: 0;
  color: #fff;

  @media (max-width: 768px) {
    top: 25px;
  }

  li {
    position: relative;
    cursor: pointer;
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
    color: #ccc;
  }

  li:hover::before {
    border-left: 5px solid #d9d9d9;
  }
`;

export const SignBtn = styled.button`
  width: 61%;
  height: 50px;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background: #aaa;
  }
`;

// Sign In Popup
export const Popup = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 10;

  background: rgba(8, 8, 8, 0.8);
`;

export const DelBtn = styled.button`
  width: 10%;
  height: 40px;
  position: absolute;
  text-align: center;
  right: 15px;
  border: none;
  border-radius: 5px;
  background: none;
  color: #fff;
  font-size: 25px;
  cursor: pointer;

  transition: background 0.1s ease;

  &:hover {
    background: #1f1f1f;
  }
`;

export const SignForm = styled.div`
  position: relative;
  margin: 0 auto;
  width: 20%;
  height: 51%;
  background: #191919;
  padding: 15px 30px;
  border-radius: 15px;
  color: #fff;

  h1 {
    font-weight: 400;
    font-size: 40px;
    margin-top: 10px;
  }

  p {
    font-weight: 300;
    margin: 15px 0;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    width: 61%;
    height: 55%;
  }
`;

export const Signup = styled.div`
  width: 100%;
  height: 45%;
  border-bottom: 1px solid #d9d9d9;
`;

export const Signdown = styled.div`
  width: 100%;
  height: 45%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 사이의 간격 조절 */
`;

export const SocialBtn = styled.div`
  width: 30%;
  height: 40%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border: 1px solid #333;
  cursor: pointer;

  img {
    width: 20%;
  }

  &:hover {
    background: #1f1f1f;
  }
`;
