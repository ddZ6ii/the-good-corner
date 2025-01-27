import { theme } from "@/themes/theme";
import { ReactNode } from "react";
import styled from "styled-components";

type AdCardProps = {
  children: ReactNode;
};

export default function Ad({ children }: AdCardProps) {
  return <AdCard>{children}</AdCard>;
}

const AdCard = styled.div`
  position: relative;
  margin: 0 auto;
  width: min(300px, 100%);
  display: grid;
  align-items: center;
  background-color: ${theme.color.white};
  border-radius: ${theme.borderRadius.rounded_lg};
  box-shadow: ${theme.shadow.base};
  color: inherit;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;
  &:has(> a:is(:hover, :focus-visible)) {
    box-shadow: ${theme.shadow.md};
    outline: 1px solid ${theme.color.primary.main};
  }
`;
