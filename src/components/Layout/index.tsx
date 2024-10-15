import styled from "styled-components";

export const Group = styled.div<{
  justify?: "flex-end" | "flex-start" | "center" | "space-around"
}>`
    display: flex;
    justify-content: ${({ justify }) => justify};
`;