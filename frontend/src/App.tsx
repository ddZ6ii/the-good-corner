import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "@layouts/PageLayout";
import HomePage from "@pages/HomePage";
import AdPage from "@pages/AdPage";
import AboutPage from "@pages/AboutPage";
import CategoryPage from "@/pages/CategoryPage";
import NewAdPage from "@/pages/NewAdPage";
import "./App.css";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
