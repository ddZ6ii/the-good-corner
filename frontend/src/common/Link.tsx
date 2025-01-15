import styled, { css } from "styled-components";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

type LinkProps = NavLinkProps & {
  $outline?: boolean;
  $filled?: boolean;
};

export const LinkBtn = styled(RouterNavLink)<LinkProps>`
  ${baseButtonStyle}
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.rounded_lg};
  text-decoration: none;

  ${({ $outline }) =>
    $outline &&
    css`
      border: ${theme.borderRadius.rounded} solid ${theme.color.primary};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
      }
    `};

  ${({ $filled }) =>
    $filled &&
    css`
      background-color: ${theme.color.primary};
      color: ${theme.color.white};
      &:is(:hover, :focus-visible) {
        background-color: #e69418;
      }
    `};
`;

export const NavLink = styled(RouterNavLink)<LinkProps>`
  padding: 4px 8px;
  border-radius: ${theme.borderRadius.rounded_lg};
  color: inherit;
  cursor: pointer;
  text-decoration: unset;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${theme.color.white};
    background-color: ${theme.color.primary};
  }
  &.active {
    color: ${theme.color.primary};
    &:hover {
      color: ${theme.color.white};
      background-color: ${theme.color.primary};
    }
  }
`;
