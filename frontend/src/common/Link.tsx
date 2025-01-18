import styled, { css } from "styled-components";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { theme } from "@themes/theme";
import { baseButtonStyle } from "@/themes/styles";

// Props can only accept either $outline or $filled, not both.
type ConditionalProps =
  | {
      $outline?: true;
      $filled?: never;
      $secondary?: boolean;
    }
  | {
      $outline?: never;
      $filled?: true;
      $secondary?: boolean;
    };

type LinkProps = NavLinkProps & ConditionalProps;

export const LinkBtn = styled(RouterNavLink)<LinkProps>`
  ${baseButtonStyle}
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.rounded_lg};
  text-decoration: none;
  &:is(:hover, :focus-visible) {
    outline: none;
  }

  ${({ $outline }) =>
    $outline &&
    css`
      border: ${theme.borderRadius.rounded} solid ${theme.color.primary.main};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.primary.main};
        color: ${theme.color.white};
      }
    `};

  ${({ $outline, $secondary }) =>
    $outline &&
    $secondary &&
    css`
      border-color: ${theme.color.secondary.main};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.secondary.main};
      }
    `};

  ${({ $filled }) =>
    $filled &&
    css`
      background-color: ${theme.color.primary.main};
      color: ${theme.color.white};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.primary.dark};
      }
    `};

  ${({ $filled, $secondary }) =>
    $filled &&
    $secondary &&
    css`
      background-color: ${theme.color.secondary.main};
      &:is(:hover, :focus-visible) {
        background-color: ${theme.color.white};
        border-color: ${theme.color.secondary.main};
        color: ${theme.color.secondary.main};
      }
    `};
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

  ${({ $secondary }) =>
    $secondary &&
    css`
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
    `}
`;
