import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "@layouts/PageLayout";
import {
  HomePage,
  AdPage,
  AboutPage,
  CategoryPage,
  EditAdPage,
  NewAdPage,
} from "@/pages";
import "./App.css";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
  // Dev mode only (Apollo dev tools with Firefox): do not use in production.
  devtools: {
    enabled: true,
  },
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
            <Route path="ads/:id/edit" Component={EditAdPage} />
            <Route path="about" Component={AboutPage} />
            <Route path="*" Component={HomePage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
