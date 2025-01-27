import { useNavigate } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { WHO_AM_I } from "@/graphql/whoAmI";
import { Button } from "@/common/Button";
import { LinkBtn } from "@/common/Link";
import { LOG_OUT } from "@/graphql/logOut";

export default function NavActions() {
  const { data: { whoAmI: user } = {}, error } = useSuspenseQuery(WHO_AM_I);

  const [logOut] = useMutation(LOG_OUT);
  const navigate = useNavigate();

  const handleLogOut = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!user) return;
      const { data, errors } = await logOut({
        refetchQueries: [{ query: WHO_AM_I }],
        awaitRefetchQueries: true, // make sure refetchQueries are completed before resolving the promise (mutation considered complete). Mandatory for the upcoming navigation which relies on the updated user authentication status for redirection.
      });

      if (errors !== undefined || !data?.logOutUser) {
        if (errors) console.error("Failed to sign out:", errors);
        throw new Error("Failed to sign out!");
      }
      navigate("/signout");
    } catch (error: unknown) {
      console.error(error);
    }
  };

  /** Display appropriate links in the navbar based on user authentication
   *
   * user is `undefined` => user is loading (waiting for the server response)
   * ⚠️ Note: this case should never be displayed to the user when using Suspense and useSuspenseQuery. The provided fallback (loader) component should be displayed instead.
   *
   * user is `null` => user is not authenticated (server responded with null)
   *
   * user is `object` => user is authenticated (server responded with user data)
   *
   */
  if (error) {
    console.error(error);
    return null;
  }
  if (user === null) {
    return (
      <>
        <LinkBtn to="/signin" color="primary" variant="outline">
          <span>Sign In</span>
        </LinkBtn>
        <LinkBtn to="/signup" variant="filled" color="secondary">
          <span>Sign Up</span>
        </LinkBtn>
      </>
    );
  }
  return (
    <>
      <LinkBtn to="/ads/new" variant="outline" color="primary">
        <span className="mobile__short">New</span>
        <span className="desktop__long">New ad</span>
      </LinkBtn>
      <Button color="secondary" onClick={handleLogOut}>
        <span>Sign Out</span>
      </Button>
    </>
  );
}
