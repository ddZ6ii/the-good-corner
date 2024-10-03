import styled, { css } from "styled-components";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $primary?: boolean;
}

const { borderRadius, color } = theme;

export const Button = styled.button<ButtonProps>`
  ${baseButtonStyle}
  border: ${borderRadius.rounded} solid ${color.primary};
  border-radius: ${borderRadius.rounded_lg};
  &:is(:hover, :focus-visible) {
    background-color: ${color.primary};
    color: ${color.white};
  }

  ${({ $primary }) =>
    $primary &&
    css`
      background-color: ${color.primary};
      color: ${color.white};
      &:is(:hover, :focus-visible) {
        background-color: ${color.white};
        color: ${color.primary};
      }
    `};

  &[disabled] {
    background-color: color-mix(
      in srgb,
      ${color.neutral.lightest} 50%,
      transparent
    );
    border-color: transparent;
    color: ${color.neutral.light};
    cursor: not-allowed;
  }
`;
