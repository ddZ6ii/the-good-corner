import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="categories-navigation">
        {NAVITEMS.map((navitem, index) => (
          <li key={navitem.id}>
            <NavLink to={navitem.to} className="category-navigation-link">
              {navitem.name}
            </NavLink>{" "}
            {index < NAVITEMS.length - 1 && " • "}
          </li>
        ))}
      </ul>
    </nav>
  );
}

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
