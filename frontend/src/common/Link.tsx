import styled, { css } from "styled-components";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

// Props can only accept either $outline or $filled, not both.
type LinkVariantProps = {
  variant?: "filled" | "outline";
  color?: "primary" | "secondary";
};

type LinkProps = NavLinkProps & LinkVariantProps;

export const LinkBtn = styled(RouterNavLink)<LinkProps>`
  ${baseButtonStyle}
  border: ${theme.borderRadius.rounded_sm} solid transparent;
  border-radius: ${theme.borderRadius.rounded_lg};
  color: ${theme.color.neutral.darkest};
  text-decoration: none;
  &:is(:hover, :focus-visible) {
    background-color: transparent;
    color: unset;
    outline: none;
  }

  ${({ color }) =>
    color === "primary" &&
    css`
      color: ${theme.color.primary.main};
    `}

  ${({ variant, color }) => {
    if (variant === "filled") {
      const baseStyle = css`
        color: ${theme.color.white};
      `;
      if (color === "secondary") {
        return css`
          ${baseStyle}
          background-color: ${theme.color.secondary.main};
          &:is(:hover, :focus-visible) {
            background-color: ${theme.color.white};
            border-color: ${theme.color.secondary.main};
            color: ${theme.color.secondary.main};
          }
        `;
      } else if (color === "primary") {
        return css`
          ${baseStyle}
          background-color: ${theme.color.primary.main};
          &:is(:hover, :focus-visible) {
            background-color: transparent;
            border-color: ${theme.color.primary.main};
            color: ${theme.color.primary.main};
          }
        `;
      } else {
        return baseStyle;
      }
    } else if (variant === "outline") {
      const baseStyle = css`
        &:is(:hover, :focus-visible) {
          background-color: ${theme.color.primary.main};
          color: ${theme.color.white};
        }
      `;
      if (color === "secondary") {
        return css`
          ${baseStyle}
          border-color: ${theme.color.secondary.main};
          &:is(:hover, :focus-visible) {
            background-color: ${theme.color.secondary.main};
          }
        `;
      } else if (color === "primary") {
        return css`
          ${baseStyle}
          border-color: ${theme.color.primary.main};
          &:is(:hover, :focus-visible) {
            background-color: ${theme.color.primary.main};
          }
        `;
      } else {
        return baseStyle;
      }
    } else {
      return css``;
    }
  }}
`;

export const NavLink = styled(RouterNavLink)<LinkProps>`
  padding: 4px 8px;
  color: ${theme.color.neutral.light};
  cursor: pointer;
  text-decoration: unset;
  transition: all 0.3s ease-in-out;
  &:visited {
    color: ${theme.color.neutral.lightest};
  }
  &:is(:hover, :focus-visible) {
    color: ${theme.color.neutral.darkest};
    outline: none;
  }
  &:active {
    color: ${theme.color.primary.main};
  }

  ${({ color }) => {
    if (color === "secondary") {
      return css`
        color: ${theme.color.secondary.main};
        &:visited {
          color: ${theme.color.secondary.main};
        }
        &:is(:hover, :focus-visible) {
          color: ${theme.color.secondary.dark};
          text-decoration: underline;
        }
        &:active {
          color: ${theme.color.primary.main};
        }
      `;
    } else if (color === "primary") {
      return css`
        color: ${theme.color.primary.main};
        &:visited {
          color: ${theme.color.primary.main};
        }
        &:is(:hover, :focus-visible) {
          color: ${theme.color.primary.dark};
          text-decoration: underline;
        }
        &:active {
          color: ${theme.color.secondary.main};
        }
      `;
    } else {
      return css``;
    }
  }}
`;
