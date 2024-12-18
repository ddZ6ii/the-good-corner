import styled from "styled-components";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LinkBtn } from "@/common/Link";
import Loader from "@/common/Loader";
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
          <LinkBtn to="/ads/new" $outline>
            <span className="mobile__short">New</span>
            <span className="desktop__long">New ad</span>
          </LinkBtn>
        </MainMenu>
        <Suspense fallback={<Loader size="sm" $mt={1.4} $mb={0.35} />}>
          <Navbar />
        </Suspense>
      </NavigationHeader>

      <MainContent>
        <Outlet />
      </MainContent>

      <ToastContainer />
    </Container>
  );
}

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
  background-color: ${theme.color.white};
  border-bottom: ${theme.borderRadius.rounded} solid
    ${theme.color.neutral.lightest};
  overflow: hidden;
`;

const MainMenu = styled.div`
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: ${theme.color.primary};

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

const MainContent = styled.main`
  padding-block: 16px;
  @media screen and (min-width: 720px) {
    padding-block: 32px;
  }
`;
