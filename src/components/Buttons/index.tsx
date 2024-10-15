import styled from "styled-components";

const Button = styled.button<{
  variant: "default" | "outlined"
  color: string
}>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: ${({ variant, color }) => (variant === "outlined" ? "transparent" : color ? color : "#64a98c")};
  cursor: pointer;
  height: 56px;
  color:  ${({ variant, color }) => (variant === "outlined" ? color ? color : "#64a98c" : "white")};
  border: ${({ variant, color }) => (variant === "outlined" ? `2px solid ${color ? color : "#64a98c"}` : "none")};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
`;


export default Button;
