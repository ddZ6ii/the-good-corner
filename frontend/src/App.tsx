import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "@layouts/PageLayout";
import HomePage from "@pages/HomePage";
import AdPage from "@pages/AdPage";
import AboutPage from "@pages/AboutPage";
import CategoryPage from "@/pages/CategoryPage";
import NewAdPage from "@/pages/NewAdPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={PageLayout}>
          <Route index Component={HomePage} />
          <Route path="ads/:id" Component={AdPage} />
          <Route path="categories/:id" Component={CategoryPage} />
          <Route path="ads/new" Component={NewAdPage} />
          <Route path="about" Component={AboutPage} />
          <Route path="*" Component={HomePage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
