// import styled from "styled-components";

// export const LayoutContainer = styled.div`
//   display: flex;
//   height: 100%;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// export const MainContent = styled.div`
//   flex-grow: 1;
//   margin-left: 280px; /* 사이드바 너비만큼 왼쪽 여백 */
//   height: 100%;
//   padding: 15px;

//   background: #080808;

//   @media (max-width: 768px) {
//     margin-left: 0;
//     width: 100%;
//     height: auto;
//   }
// `;

import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  flex-direction: column;
  background: #0d0d0e;
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
