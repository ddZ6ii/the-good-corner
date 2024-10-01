import styled from "styled-components";
import { theme } from "@/themes/theme";

const { color, borderRadius, shadow } = theme;

export const Card = styled.div`
  display: grid;
  padding: 1rem;
  background-color: ${color.white};
  border-radius: ${borderRadius.rounded_lg};
  border: ${borderRadius.rounded} solid ${color.neutral.lightest};
  box-shadow: ${shadow.base};
  color: inherit;
  transition: box-shadow 0.3s ease-in-out;

  &:has(.card__link:is(:hover, :focus-visible)) {
    outline: ${borderRadius.rounded_sm} solid ${color.primary};
    border-color: transparent;
    box-shadow: ${shadow.md};
  }

  & .card__link {
    text-decoration: inherit;
    color: inherit;
    &:focus-visible {
      outline: none;
    }
    &:hover {
      & .card__thumbnail {
        transform: scale(1.05);
      }
    }
  }

  & .card__thumbnail {
    width: 100%;
    border-radius: ${borderRadius.rounded_lg};
    transition: transform 0.3s ease-in-out;
  }

  & .card__details {
    padding: 12px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .card__title {
    font-weight: bold;
  }

  & .card__price {
    font-weight: medium;
    color: ${color.primary};
  }

  & .card__cta {
    width: "100%";
    display: "block";
  }
`;
