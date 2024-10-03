import styled from "styled-components";
import { theme } from "@/themes/theme";

const { color, borderRadius, shadow } = theme;

export const Card = styled.div`
  margin: 0 auto;
  width: min(300px, 100%);
  display: grid;
  align-items: center;
  background-color: ${color.white};
  border-radius: ${borderRadius.rounded_lg};
  box-shadow: ${shadow.base};
  color: inherit;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;

  &:has(.card__link:is(:hover, :focus-visible)) {
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
    aspect-ratio: 3 / 2;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  & .card__details {
    margin-block: 8px;
    padding: 1rem;
    display: grid;
    font-size: 18px;
    text-align: left;
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
    font-size: 14px;
    font-weight: medium;
    color: ${color.neutral.light};
    white-space: nowrap;
  }

  & .card__wrapper__cta {
    padding: 0 1rem 1rem;
  }

  & .card__cta {
    width: 100%;
  }
`;
