import styled from "styled-components";
import { theme } from "@/themes/theme";

export const Form = styled.form`
  margin: 0 auto;
  padding: 16px 32px;
  width: min(100%, 640px);
  display: grid;
  gap: 16px;
  background-color: ${theme.color.white};
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_lg};
`;
