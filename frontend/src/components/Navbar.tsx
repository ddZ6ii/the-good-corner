import styled from "styled-components";
import { theme } from "@/themes/theme";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "@/hooks/useAxios";
import { Category } from "@tgc/common";
import { Loader } from "@/common/Loader";
import { capitalize } from "@/utils/format";
import { NavLink } from "react-router-dom";

const FETCH_OPTIONS: AxiosRequestConfig = {
  method: "GET",
};

export default function Navbar() {
  const {
    data: categories,
    error,
    isLoading,
  } = useAxios<Category[]>("categories", FETCH_OPTIONS);

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    console.error(error);
    return <p>{error}</p>;
  }

  if (!categories) {
    return <p>Data was null</p>;
  }

  return (
    <Nav>
      <ul className="navlist">
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`categories/${category.id.toString()}`}
              className="nav__link"
            >
              {capitalize(category.name)}
            </NavLink>
          </li>
        ))}
      </ul>
    </Nav>
  );
}

const { borderRadius, color } = theme;

const Nav = styled.nav`
  & .navlist {
    padding: 16px 10px 6px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 12px;
    font-weight: bold;
    color: ${color.neutral.light};
    white-space: nowrap;
    overflow-x: auto;
    @media screen and (min-width: 720px) {
      padding-top: 14px;
    }
  }

  & li {
    margin-bottom: 4px;
  }

  & .nav__link {
    padding: 4px 8px;
    border-radius: ${borderRadius.rounded_lg};
    color: inherit;
    cursor: pointer;
    text-decoration: unset;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${color.white};
      background-color: ${color.primary};
    }
  }
`;
