import styled, { css } from "styled-components";
import { baseInputStyle } from "@/themes/styles";

export const Input = styled.input`
  ${baseInputStyle}
  ${({ type }) =>
    type === "checkbox" &&
    css`
      cursor: pointer;
    `}
  &[disabled] {
    cursor: not-allowed;
  }
`;
