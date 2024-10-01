import styled from "styled-components";
import { theme } from "@/themes/theme";

const { color, borderRadius, shadow } = theme;

export const Card = styled.div`
  padding: 1rem;
  display: grid;
  background-color: ${color.white};
  border-radius: ${borderRadius.rounded_lg};
  border: ${borderRadius.rounded} solid ${color.neutral.lightest};
  box-shadow: ${shadow.base};
  color: inherit;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;

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
    max-width: 100%;
    border-radius: ${borderRadius.rounded_lg};
    transition: transform 0.3s ease-in-out;
  }

  & .card__details {
    padding: 12px;
    font-size: 18px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 16px;
  }

  & .card__title {
    font-weight: bold;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .card__price {
    font-weight: medium;
    color: ${color.primary};
    white-space: nowrap;
  }

  & .card__cta {
    width: "100%";
    display: "block";
  }
`;
