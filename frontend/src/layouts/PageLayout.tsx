import styled from "styled-components";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { Button } from "@/common/Button";
import { LinkBtn } from "@/common/Link";
import Loader from "@/common/Loader";
import Logo from "@components/Logo";
import Navbar from "@components/Navbar";
import SearchBar from "@components/SearchBar";
import { LOG_OUT } from "@/graphql/logOut";
import { theme } from "@/themes/theme";

export default function PageLayout() {
  const [logOut] = useMutation(LOG_OUT);
  const navigate = useNavigate();

  const handleLogOut = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // !TODO: logout user only if user is authenticated...
      console.log("login out...");
      const { data, errors } = await logOut();
      console.log("errors", errors);

      if (errors !== undefined || !data?.logOutUser) {
        if (errors) console.error("Failed to sign out:", errors);
        throw new Error("Failed to sign out!");
      }
      // !TODO: display logout notification (See you soon & Have nice day 👋...
      navigate("/sigin");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Container>
      <NavigationHeader>
        <MainMenu>
          <Logo />
          <SearchBar />
          {/* !TODO: dynamicall handle the buttons display based on user authentication status... */}
          <LinkBtn to="/ads/new" $outline>
            <span className="mobile__short">New</span>
            <span className="desktop__long">New ad</span>
          </LinkBtn>
          <LinkBtn to="/signin" $outline>
            <span>Sign In</span>
          </LinkBtn>
          <LinkBtn to="/signup" $filled>
            <span>Sign Up</span>
          </LinkBtn>
          <Button $primary onClick={handleLogOut}>
            <span>Sign Out</span>
          </Button>
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
