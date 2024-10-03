import styled from "styled-components";

type MainContentProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

export default function MainContent({ title, children }: MainContentProps) {
  return (
    <Section>
      <Container>
        <Title>{title}</Title>
      </Container>
      {children}
    </Section>
  );
}

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const Container = styled.div``;

const Section = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: start;
  gap: 32px;
`;
