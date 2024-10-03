import styled, { css } from "styled-components";
import { NavLink, NavLinkProps } from "react-router-dom";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

type LinkProps = NavLinkProps & {
  $outline?: boolean;
};

const { borderRadius, color } = theme;

export const Link = styled(NavLink)<LinkProps>`
  ${baseButtonStyle}
  border: none;
  border-radius: ${borderRadius.rounded_lg};
  text-decoration: none;

  ${({ $outline }) =>
    $outline &&
    css`
      border: ${borderRadius.rounded} solid ${color.primary};
      border-radius: ${borderRadius.rounded_lg};
      &:is(:hover, :focus-visible) {
        background-color: ${color.primary};
        color: ${color.white};
      }
    `};
`;

export const LinkNav = styled(NavLink)<LinkProps>`
  padding: 4px 8px;
  border-radius: ${borderRadius.rounded_lg};
  color: inherit;
  cursor: pointer;
  text-decoration: unset;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${color.white};
    background-color: ${color.primary};
  }
`;
