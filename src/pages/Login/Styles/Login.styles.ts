import styled, { css, keyframes } from "styled-components";


export const slideOutLeft = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const slideInRight = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimatedDiv = styled.div<{ step: number; activeStep: number }>`
${({ step, activeStep }) =>
  step === 1 && activeStep === 2
    ? css`
        animation: ${slideOutLeft} 0.5s forwards;
      `
    : step === 2 && activeStep === 2
    ? css`
        animation: ${slideInRight} 0.5s forwards;
      `
    : ''}
`;


export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #0d0d0e;
`;

export const Uid = styled.div`
  width:100%;
  text-align:center;
  margin-top:100px;
  color:#fff;
`
export const infoTitle = styled.p`
  font-size:4.7em;
  font-family:thin;
  padding:50px 0;
`

export const Character = styled.img`
  margin-bottom:50px;
`

export const Form = styled.div`
  width: 30%;
  height:100px;
  margin: 0 auto;
  position: relative;
`

export const AddInput = styled.input`
  text-align: center;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: none;
  outline: none;
  background: #2F2F2F;
  color: #fff;
  font-size: 1em;
`

export const AddBtn = styled.button`
  position: absolute;
  right: 15px;
  background: #515151;
  top:5%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  font-size: 1.5em;
  text-align: center;
  color: #fff;
  line-height: -10px;
  cursor: pointer;
`

export const Warn = styled.p`
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: #5e5e5e;
  font-size: 0.9em;
`

export const LeftPanel = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0e0e0e;
  position: relative;
  overflow: hidden;
`;

export const RightPanel = styled.div`
  flex: 4;
  background: #0e0e0e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
`;

interface CircleProps {
  size: string;
  bottom?: string;
  left?: string;
  translateX?: string;
  translateY?: string;
  gradient: string;
}

export const Circle = styled.div<CircleProps>`
  position: absolute;
  background: ${(props) => props.gradient};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  transform: translateX(${(props) => props.translateX || "0"})
    translateY(${(props) => props.translateY || "0"});
  filter: blur(100px);
`;

export const SignInBox = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: left;
  color: white;
`;

export const Title = styled.h1`
  margin-left:50px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
`;

export const SubTitle = styled.p`
  margin-left:50px;
  margin-bottom: 40px;
  color: #d9d9d9;
  font-size: 20px;
  font-weight: bold;
`;

export const Button = styled.button`
  width: 300px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin:0 auto;
  margin-bottom: 15px;

  img {
    width: 20px;
    height: 20px;
    margin-right:10px;
  }

    span {
    flex: 0.9;
    text-align: center;
  }

  &:hover {
    background-color: #444;
  }
`;

export const Line = styled.div`
  width:400px;
  border:1px solid #474747;
  margin-right:50px;
  margin:70px 0;
`

export const Footer = styled.p`
  font-size: 0.875rem;
  color: #818391;
  text-align: center;
`;
