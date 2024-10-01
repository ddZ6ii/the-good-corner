import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Logo from "@components/Logo";
import { MainMenu } from "@components/MainMenu";
import Navbar from "@components/Navbar";
import SearchBar from "@components/SearchBar";
import { NavigationHeader } from "@layouts/NavigationHeader";
import { PageContent } from "@layouts/PageContent";
import { Link } from "@/common/Link";

export default function PageLayout() {
  return (
    <Container>
      <NavigationHeader>
        <MainMenu>
          <Logo />
          <SearchBar />
          <Link to="/post-ad" $outline>
            <span className="mobile__short">New</span>
            <span className="desktop__long">New ad</span>
          </Link>
        </MainMenu>
        <Navbar />
      </NavigationHeader>

      <PageContent>
        <Outlet />
      </PageContent>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  min-height: 100dvh;
  max-width: 1280px;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
`;
