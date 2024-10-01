import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <h1>
      <NavLink to="/" className="button logo link-button">
        <span className="mobile-short-label">TGC</span>
        <span className="desktop-long-label">THE GOOD CORNER</span>
      </NavLink>
    </h1>
  );
}
