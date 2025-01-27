import styled, { css } from "styled-components";
import { ReactNode } from "react";
import { theme } from "@themes/theme";

type SizeVariant = "sm" | "md" | "lg";

type SpinnerProps = {
  size: SizeVariant;
};

type ContainerProps = {
  $center?: boolean;
  $mt?: number;
  $mb?: number;
  $ml?: number;
  $mr?: number;
  $mx?: number;
  $my?: number;
};

type LoaderProps = Partial<SpinnerProps> &
  ContainerProps & {
    children?: ReactNode;
  };

export default function Loader({
  size = "md",
  $center = false,
  children,
  ...restProps
}: LoaderProps) {
  return (
    <Container $center={$center} {...restProps}>
      <Spinner size={size} />
      {children}
    </Container>
  );
}

const variant = {
  width: {
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
  },
};

const Container = styled.div<ContainerProps>`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  ${({ $mx }) =>
    $mx &&
    css`
      margin-inline: ${$mx}em;
    `}
  ${({ $my }) =>
    $my &&
    css`
      margin-block: ${$my}em;
    `}
  ${({ $mt }) =>
    $mt &&
    css`
      margin-top: ${$mt}em;
    `} 
    ${({ $mb }) =>
    $mb &&
    css`
      margin-bottom: ${$mb}em;
    `} 
    ${({ $ml }) =>
    $ml &&
    css`
      margin-left: ${$ml}em;
    `} 
    ${({ $mr }) =>
    $mr &&
    css`
      margin-right: ${$mr}em;
    `}
    ${({ $center }) =>
    $center &&
    css`
      height: 100%;
    `}
`;

const Spinner = styled.div<SpinnerProps>`
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, ${theme.color.primary.main} 94%, #0000)
      top/var(--offset) var(--offset) no-repeat,
    conic-gradient(#0000 30%, ${theme.color.primary.main});
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
  ${({ size }) => variant.width[size]}

  @keyframes spinner-c7wet2 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
