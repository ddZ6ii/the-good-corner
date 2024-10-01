import styled from "styled-components";
import { Link } from "@/common/Link";

export default function Logo() {
  return (
    <Heading>
      <Link to="/">
        <span className="mobile__short">TGC</span>
        <span className="desktop__long">THE GOOD CORNER</span>
      </Link>
    </Heading>
  );
}

const Heading = styled.h1`
  & .mobile__short {
    @media screen and (min-width: 720px) {
      display: none;
    }
  }
  & .desktop__long {
    display: none;
    @media screen and (min-width: 720px) {
      display: initial;
    }
  }
`;
