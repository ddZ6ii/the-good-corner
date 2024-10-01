import styled from "styled-components";
import { theme } from "@themes/theme";

const { borderRadius, color } = theme;

export const Input = styled.input`
  padding: 8px;
  height: 40px;
  width: 100%;
  min-width: 120px;
  max-width: 360px;
  flex-grow: 1;
  background-color: ${color.white};
  border: ${borderRadius.rounded} solid ${color.primary};
  border-radius: ${borderRadius.rounded_lg};
  font-family: inherit;
  font-size: 12px;
`;
