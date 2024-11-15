import styled, { css } from "styled-components";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

type LinkProps = NavLinkProps & {
  $outline?: boolean;
};

export const LinkBtn = styled(RouterNavLink)<LinkProps>`
  ${baseButtonStyle}
  border: none;
  border-radius: ${theme.borderRadius.rounded_lg};
  text-decoration: none;

  ${({ $outline }) =>
    $outline &&
    css`
      border: ${theme.borderRadius.rounded} solid ${theme.color.primary};
      border-radius: ${theme.borderRadius.rounded_lg};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
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
