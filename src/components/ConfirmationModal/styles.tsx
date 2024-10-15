import styled, { keyframes } from "styled-components";

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const Card = styled.div<{isClosing: boolean}>`
    position: relative;
    z-index: 10;
    width: 400px;
    height: 200px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px;
    animation: ${({ isClosing }) => (isClosing ? scaleOut : scaleIn)} 0.3s ease-in-out forwards;

    @keyframes scaleCard {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
`;

export const Container = styled.div`
    top: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
`;