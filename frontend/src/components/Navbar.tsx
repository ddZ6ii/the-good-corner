import styled from "styled-components";
import { useAxios } from "@/hooks/useAxios";
import { Category } from "@tgc/common";
import Loader from "@/common/Loader";
import { LinkNav } from "@/common/Link";
import { theme } from "@/themes/theme";
import { capitalize } from "@/utils/format";

export default function Navbar() {
  const {
    data: categories,
    error,
    isLoading,
  } = useAxios<Category[]>("categories");

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!categories) {
    return <p>No categories available...</p>;
  }

  return (
    <nav>
      <NavList>
        {categories.map((category) => (
          <li key={category.id}>
            <LinkNav
              to={`categories/${category.id.toString()}`}
              className="nav__link"
            >
              {capitalize(category.name)}
            </LinkNav>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

const { color } = theme;

const NavList = styled.ul`
  padding: 16px 10px 6px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  font-weight: bold;
  color: ${color.neutral.light};
  white-space: nowrap;
  overflow-x: auto;
  & li {
    margin-bottom: 4px;
  }
  @media screen and (min-width: 720px) {
    padding-top: 14px;
  }
`;
