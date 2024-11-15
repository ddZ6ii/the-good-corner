import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";
import { baseButtonStyle } from "@/themes/styles";
import { theme } from "@themes/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  ${baseButtonStyle}
  border: ${theme.borderRadius.rounded} solid ${theme.color.primary};
  border-radius: ${theme.borderRadius.rounded_lg};
  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
  }

  ${({ $primary }) =>
    $primary &&
    css`
      background-color: ${theme.color.primary};
      color: ${theme.color.white};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.white};
        color: ${theme.color.primary};
      }
    `};

  &[disabled] {
    background-color: color-mix(
      in srgb,
      ${theme.color.neutral.lightest} 50%,
      transparent
    );
    border-color: transparent;
    color: ${theme.color.neutral.light};
    cursor: not-allowed;
  }
`;
