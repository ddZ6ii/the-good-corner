import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PageLayout, ProtectedRoute } from '@/layouts'
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
} from '@/pages'
import { AuthStatus } from '@/types'
import './App.css'

const client = new ApolloClient({
  /*
    Use an url relative to the app unique entrypoint defined by the nginx api gateway.
    Using a proxy to centralize the entrypoint avoids CORS policy issue (backend server is on a different domain that the frontend server (different port)).
    Using a relative url is also a good practice to avoid hardcoding the backend server url which can change depending on the environment (development, staging, production).
   */
  uri: '/api',
  cache: new InMemoryCache(),
  // Dev mode only (Apollo dev tools with Firefox): do not use in production.
  devtools: {
    enabled: true,
  },
  /*
    Send the cookies along with every request (user authentication). 
    Set the "credentials" option to "same-origin" if the backend server is in the same domain.
  */
  credentials: 'same-origin',
})

/* 
  Public and protected routes
  --------------------------------
  Public routes (no authentication required): HomePage, AboutPage, 404 page
  Protected routes:
  - authentication required: AdPage, CategoryPage, NewAdPage, EditAdPage
  - no authentication required: SignInPage, SignUpPage, SignOutPage
*/
export default function App() {
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
  )
}
