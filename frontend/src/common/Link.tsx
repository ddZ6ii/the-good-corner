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
