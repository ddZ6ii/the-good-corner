import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageLayout from "@layouts/PageLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import {
  AdminPage,
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
import { AuthStatus } from "@/types/auth.types";

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

/** Public and protected routes
 * Public routes (no authentication required): HomePage, AboutPage, 404 page
 * Protected routes:
 * - authentication required: AdPage, CategoryPage, NewAdPage, EditAdPage
 * - no authentication required: SignInPage, SignUpPage, SignOutPage
 *
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            {/* Public pages */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="ads/:id" element={<AdPage />} />
            <Route path="categories/:id" element={<CategoryPage />} />

            {/* Guest pages */}
            <Route
              element={
                <ProtectedRoute authStates={[AuthStatus.UNAUTHENTICATED]} />
              }
            >
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signout" element={<SignOutPage />} />
            </Route>

            {/* Admin pages */}
            <Route element={<ProtectedRoute authStates={[AuthStatus.ADMIN]} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>

            {/* User & admin pages */}
            <Route
              element={
                <ProtectedRoute
                  authStates={[AuthStatus.USER, AuthStatus.ADMIN]}
                  redirectPath="/signin"
                />
              }
            >
              <Route path="ads/new" element={<NewAdPage />} />
              <Route path="ads/:id/edit" element={<EditAdPage />} />
            </Route>

            {/* Public 404 page */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
