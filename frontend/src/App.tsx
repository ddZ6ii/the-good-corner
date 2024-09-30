import NavigationHeader from "@components/layout/NavigationHeader";
import RecentAds from "@components/RecentAds";
import PageContent from "@components/layout/PageContent";
import MainMenu from "@components/MainMenu";
import Logo from "@components/Logo";
import SearchBar from "@components/SearchBar";
import Link from "@components/common/Link";
import Navbar from "@components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <NavigationHeader>
        <MainMenu>
          <Logo />
          <SearchBar />
          <Link to="/post-ad" className="button link-button">
            <span className="mobile-short-label">New</span>
            <span className="desktop-long-label">New ad</span>
          </Link>
        </MainMenu>
        <Navbar />
      </NavigationHeader>

      <PageContent>
        <RecentAds />
      </PageContent>
    </>
  );
}

export default App;
