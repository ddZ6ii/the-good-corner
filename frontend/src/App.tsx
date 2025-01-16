import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "@layouts/PageLayout";
import {
  AdPage,
  AboutPage,
  CategoryPage,
  EditAdPage,
  HomePage,
  NewAdPage,
  SignInPage,
  SignUpPage,
  SignOutPage,
} from "@/pages";
import "./App.css";

const client = new ApolloClient({
  // Use the `proxy` url defined in vite.config.ts to avoid CORS policy issue (backend server is on a different domain that the frontend server (different port))
  uri: "/api",
  cache: new InMemoryCache(),
  // Dev mode only (Apollo dev tools with Firefox): do not use in production.
  devtools: {
    enabled: true,
  },
  // Send the cookies along with every request (user authentication). Set the "credentials" option to "same-origin" if the backend server is in the same domain.
  credentials: "same-origin",
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
            {/* !TODO: have a single SignIn / SignUp page depending on current user's authentication state... */}
            <Route path="signin" Component={SignInPage} />
            <Route path="signup" Component={SignUpPage} />
            <Route path="signout" Component={SignOutPage} />
            <Route path="*" Component={HomePage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
