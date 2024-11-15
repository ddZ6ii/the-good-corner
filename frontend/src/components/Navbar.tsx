import styled from "styled-components";
import { useSuspenseQuery } from "@apollo/client";
import { Category } from "@tgc/common";
import { NavLink } from "@/common/Link";
import { GET_CATEGORIES } from "@/graphql/categories";
import { theme } from "@/themes/theme";
import { capitalize } from "@/utils/format";

export default function Navbar() {
  const { data: { categories = [] } = {}, error } = useSuspenseQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);

  if (error) {
    console.error(error);
    return <p>No categories currently available...</p>;
  }

  return (
    <nav>
      <NavList>
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink to={`categories/${category.id.toString()}`}>
              {capitalize(category.name)}
            </NavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

const NavList = styled.ul`
  padding: 16px 10px 6px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  font-weight: bold;
  color: ${theme.color.neutral.light};
  white-space: nowrap;
  overflow-x: auto;
  & li {
    margin-bottom: 4px;
  }
  @media screen and (min-width: 720px) {
    padding-top: 14px;
  }
`;
