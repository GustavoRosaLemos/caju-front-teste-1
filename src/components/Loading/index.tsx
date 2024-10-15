import styled from "styled-components";

interface LetterProps {
  delay: number;
}

const Letter = styled.span<LetterProps>`
  display: inline-block;
  animation: disintegrateText 10s ease-in-out infinite;
  animation-delay: ${({ delay }) => `${delay-2}s`};
  background: linear-gradient(
    258deg,
    rgba(255, 117, 0, 1) 8%,
    rgba(232, 5, 55, 1) 53%
  );
  -webkit-background-clip: text; /* Para compatibilidade com WebKit */
  background-clip: text; /* Padrão, para outros navegadores */
  -webkit-text-fill-color: transparent; /* Para compatibilidade com WebKit */
`;

const Loading = styled.div`
  font-size: 120px;
  font-weight: bold;
  display: inline-flex;
  position: fixed;

@keyframes disintegrateText {
  20% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
  50% {
    transform: scale(10);
    opacity: 0;
    filter: blur(10px);
  }
  70% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
}
`;

interface LoadingTextProps {
  text: string
}

export const LoadingText = ({text}: LoadingTextProps) => (
  <Loading>
    {text.split('').map((letter, index) => <Letter key={index} delay={index}>{letter}</Letter> )}
  </Loading>
);