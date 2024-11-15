import styled from "styled-components";
import { ReactNode } from "react";

type PageContentProps = {
  title?: ReactNode;
  children: ReactNode;
};

export default function PageContent({ title, children }: PageContentProps) {
  return (
    <Section>
      <Title>{title}</Title>
      {children}
    </Section>
  );
}

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const Section = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: start;
  gap: 32px;
`;
