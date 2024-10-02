import styled, { css } from "styled-components";
import { theme } from "@themes/theme";

type SpinnerSizeVariant = "sm" | "md" | "lg";

type SpinnerProps = {
  size: SpinnerSizeVariant;
};

type LoaderProps = Partial<SpinnerProps> & {
  children?: React.ReactNode;
};

export function Loader({ size = "md", children }: LoaderProps) {
  return (
    <Container>
      <Spinner size={size} />
      {children}
    </Container>
  );
}

const { color } = theme;

const variant = {
  sm: css`
    --offset: 4px;
    width: 16px;
  `,
  md: css`
    --offset: 6px;
    width: 32px;
  `,
  lg: css`
    --offset: 8px;
    width: 56px;
  `,
};

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Spinner = styled.div<SpinnerProps>`
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, ${color.primary} 94%, #0000)
      top/var(--offset) var(--offset) no-repeat,
    conic-gradient(#0000 30%, ${color.primary});
  mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - var(--offset)),
    #000 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - var(--offset)),
    #000 0
  );
  animation: spinner-c7wet2 1s infinite linear;

  /* Variants passed as props overwrite base styling. */
  ${({ size }) => variant[size]}

  @keyframes spinner-c7wet2 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
