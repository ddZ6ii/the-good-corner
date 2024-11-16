import { theme } from "@/themes/theme";
import styled from "styled-components";

export const Fieldset = styled.fieldset`
  padding: 16px;
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_md};
  & input[type="checkbox"] + label {
    color: black;
  }
  &::placeholder {
    color: color-mix(in srgb, ${theme.color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${theme.color.primary};
  }
`;
