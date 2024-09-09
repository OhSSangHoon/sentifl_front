import isPropValid from '@emotion/is-prop-valid';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, StyleSheetManager } from "styled-components";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Router from "./route/Router";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    box-sizing: border-box;
    overflow-x:hidden;
  }

  /* 스크롤바 숨기기 */
  body::-webkit-scrollbar {
    width: 0.4em;
  }
  
  body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    outline: none;
  }

  body::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;
export default GlobalStyle;

ReactDOM.render(
  <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
  <BrowserRouter>
    <GlobalStyle />
    <Router />
  </BrowserRouter>
  </StyleSheetManager>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
