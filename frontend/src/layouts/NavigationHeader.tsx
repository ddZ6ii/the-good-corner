import styled from "styled-components";
import { theme } from "@themes/theme";

const { borderRadius, color } = theme;

export const NavigationHeader = styled.header`
  padding: 10px;
  background-color: ${color.white};
  border-bottom: ${borderRadius.rounded} solid ${color.neutral.lightest};
  overflow: hidden;
`;
