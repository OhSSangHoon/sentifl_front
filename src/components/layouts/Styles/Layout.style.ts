import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #0d0d0e;
`;

export const DotNavWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 100px;
  transition: opacity 0.5s ease;
`;
