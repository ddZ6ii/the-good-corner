import styled from "styled-components";
import { theme } from "@themes/theme";

const { color } = theme;

export const MainMenu = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: ${color.primary};

  & .mobile__short {
    @media screen and (min-width: 720px) {
      display: none;
    }
  }
  & .desktop__long {
    display: none;
    @media screen and (min-width: 720px) {
      display: initial;
    }
  }
`;
