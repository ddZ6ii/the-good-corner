import { css } from "styled-components";
import { theme } from "@/themes/theme";

export const baseButtonStyle = css`
  padding: 8px;
  min-width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  background-color: ${theme.color.white};

  color: ${theme.color.primary};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
  }
`;

export const baseInputStyle = css`
  padding: 8px 8px;
  border: ${theme.borderRadius.rounded_sm} solid ${theme.color.neutral.lightest};
  border-radius: ${theme.borderRadius.rounded_md};
  &::placeholder {
    color: color-mix(in srgb, ${theme.color.neutral.light} 50%, transparent);
  }
  &:focus-visible {
    outline-color: ${theme.color.primary};
  }
  &:has(+ p) {
    border-color: ${theme.color.status.danger};
    &:focus-visible {
      outline-color: ${theme.color.status.danger};
    }
  }
`;
