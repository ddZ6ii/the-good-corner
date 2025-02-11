import styled, { css } from 'styled-components'
import { ButtonHTMLAttributes } from 'react'
import { baseButtonStyle } from '@/styles'
import { theme } from '@/themes'

// Props can only accept either $primary or $secondary, not both.
type ButtonVariantProps = {
  color?: 'primary' | 'secondary'
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps

export const Button = styled.button<ButtonProps>`
  ${baseButtonStyle}
  background-color: ${theme.color.neutral.dark};
  border: ${theme.borderRadius.rounded_sm} solid transparent;
  border-radius: ${theme.borderRadius.rounded_lg};
  color: ${theme.color.neutral.lightest};
  &:hover {
    background-color: ${theme.color.neutral.light};
  }
  &:focus-visible {
    background-color: transparent;
    border-color: ${theme.color.secondary.main};
    color: ${theme.color.secondary.main};
  }

  ${({ color }) => {
    if (color === 'secondary') {
      return css`
        background-color: ${theme.color.secondary.main};
        border-color: ${theme.color.secondary.main};
        color: ${theme.color.white};
        &:is(:hover, :focus-visible) {
          background-color: ${theme.color.white};
          border-color: ${theme.color.secondary.main};
          color: ${theme.color.secondary.main};
        }
      `
    } else if (color === 'primary') {
      return css`
        background-color: ${theme.color.primary.main};
        color: ${theme.color.white};
        &:is(:hover, :focus-visible) {
          background-color: transparent;
          border-color: ${theme.color.primary.main};
          color: ${theme.color.primary.main};
        }
      `
    }
    return css``
  }};

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
`
