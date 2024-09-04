import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

export const SlideInDiv = styled.div`
  &.slide-enter {
    opacity: 0;
    transform: translateY(100%);
  }

  &.slide-enter-active {
    opacity: 1;
    transform: translateY(0);
    animation: ${slideIn} 500ms forwards;
  }

  &.slide-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.slide-exit-active {
    opacity: 0;
    transform: translateY(-100%);
    animation: ${slideOut} 500ms forwards;
  }
`;
