import Logo from "@components/Logo";
import MainMenu from "@components/MainMenu";
import Navbar from "@components/Navbar";
import SearchBar from "@components/SearchBar";
import NavigationHeader from "@layouts/NavigationHeader";
import PageContent from "@layouts/PageContent";
import { NavLink, Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <NavigationHeader>
        <MainMenu>
          <Logo />
          <SearchBar />
          <NavLink to="/post-ad" className="button link-button">
            <span className="mobile-short-label">New</span>
            <span className="desktop-long-label">New ad</span>
          </NavLink>
        </MainMenu>
        <Navbar />
      </NavigationHeader>

      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
}
