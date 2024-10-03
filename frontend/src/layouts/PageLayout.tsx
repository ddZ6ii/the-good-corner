import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Link } from "@/common/Link";
import Logo from "@components/Logo";
import Navbar from "@components/Navbar";
import SearchBar from "@components/SearchBar";
import { theme } from "@/themes/theme";

export default function PageLayout() {
  return (
    <Container>
      <NavigationHeader>
        <MainMenu>
          <Logo />
          <SearchBar />
          <Link to="/ads/new" $outline>
            <span className="mobile__short">New</span>
            <span className="desktop__long">New ad</span>
          </Link>
        </MainMenu>
        <Navbar />
      </NavigationHeader>

      <PageContent>
        <Outlet />
      </PageContent>

      <ToastContainer />
    </Container>
  );
}

const { borderRadius, color } = theme;

const Container = styled.div`
  padding-inline: 16px;
  margin: 0 auto;
  min-height: 100dvh;
  max-width: 1280px;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
  @media screen and (min-width: 720px) {
    padding-inline: 32px;
  }
`;

const NavigationHeader = styled.header`
  padding: 10px;
  background-color: ${color.white};
  border-bottom: ${borderRadius.rounded} solid ${color.neutral.lightest};
  overflow: hidden;
`;

const MainMenu = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: ${color.primary};

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

const PageContent = styled.main`
  padding-block: 16px;
  @media screen and (min-width: 720px) {
    padding-block: 32px;
  }
`;
