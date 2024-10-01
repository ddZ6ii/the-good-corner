import { css } from "styled-components";
import { theme } from "@/themes/theme";

const { color } = theme;

export const baseButtonStyle = css`
  padding: 8px;
  min-width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  background-color: ${color.white};

  color: ${color.primary};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:is(:hover, :focus-visible) {
    background-color: ${color.primary};
    color: ${color.white};
  }
`;
