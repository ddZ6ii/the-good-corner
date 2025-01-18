import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";
import { baseButtonStyle } from "@/themes/styles";
import { theme } from "@themes/theme";

// Props can only accept either $primary or $secondary, not both.
type ConditionalProps =
  | {
      $primary?: true;
      $secondary?: never;
    }
  | {
      $primary?: never;
      $secondary: true;
    };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ConditionalProps;

export const Button = styled.button<ButtonProps>`
  ${baseButtonStyle}
  border: ${theme.borderRadius.rounded} solid ${theme.color.primary.main};
  border-radius: ${theme.borderRadius.rounded_lg};
  &:is(:hover, :focus-visible) {
    background-color: ${theme.color.primary.main};
    color: ${theme.color.white};
  }

  ${({ $primary }) =>
    $primary &&
    css`
      background-color: ${theme.color.primary.main};
      color: ${theme.color.white};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.primary.dark};
      }
    `};

  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: ${theme.color.secondary.main};
      border-color: ${theme.color.secondary.main};
      color: ${theme.color.white};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.white};
        border-color: ${theme.color.secondary.main};
        color: ${theme.color.secondary.main};
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
