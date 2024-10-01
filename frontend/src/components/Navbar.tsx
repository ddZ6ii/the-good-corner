import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "@/themes/theme";

const NAVITEMS = [
  {
    id: 1,
    name: "Furniture",
    to: "",
  },
  {
    id: 2,
    name: "Household Appliances",
    to: "",
  },
  {
    id: 3,
    name: "Photography",
    to: "",
  },
  {
    id: 4,
    name: "Computing",
    to: "",
  },
  {
    id: 5,
    name: "Mobile",
    to: "",
  },
  {
    id: 6,
    name: "Bikes",
    to: "",
  },
  {
    id: 7,
    name: "Vehicules",
    to: "",
  },
  {
    id: 8,
    name: "Sport",
    to: "",
  },
  {
    id: 9,
    name: "Clothing",
    to: "",
  },
  {
    id: 10,
    name: "Baby",
    to: "",
  },
  {
    id: 11,
    name: "Tools",
    to: "",
  },
  {
    id: 12,
    name: "Services",
    to: "",
  },
  {
    id: 13,
    name: "Holidays",
    to: "",
  },
];

const { color } = theme;

const Nav = styled.nav`
  & .navlist {
    padding: 16px 10px 6px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    white-space: nowrap;
    overflow-x: auto;
    @media screen and (min-width: 720px) {
      padding-top: 14px;
    }
  }

  & li {
    padding: 4px 8px;
  }

  & .nav__link {
    text-decoration: unset;
    color: inherit;
    transition: color 0.15s ease-in-out;
    &:hover {
      color: ${color.primary};
    }
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <ul className="navlist">
        {NAVITEMS.map((navitem) => (
          <li key={navitem.id}>
            <NavLink to={navitem.to} className="nav__link">
              {navitem.name}
            </NavLink>{" "}
          </li>
        ))}
      </ul>
    </Nav>
  );
}
