import  styled, { keyframes } from 'styled-components';

const loadingsAnimation = keyframes`
    0% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.8;
    }
`;

export const LoadingCircle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3498db;
  border: solid #000 1px;
  margin: 0 15px;
  animation: ${loadingsAnimation} 1s infinite alternate;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;