import styled, { css } from "styled-components";

export const Field = styled.div<{ $inline?: boolean }>`
  display: grid;
  text-align: left;
  gap: 8px;
  font-size: 14px;
  ${({ $inline }) =>
    $inline &&
    css`
      grid-template-columns: auto 1fr;
      gap: 4px;
    `}
  & input[type="checkbox"] + label {
    cursor: pointer;
    font-weight: normal;
  }
`;
