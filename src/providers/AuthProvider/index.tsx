import { ReactNode, useState } from "react";
import getAccessToken from "./helpers/getAccessToken";
import useLoginFromUrl from "./helpers/hooks/useLoginFromUrl";
import removeAllAuthCookies from "./helpers/removeAllAuthCookies";
import setAllAuthCookies from "./helpers/setAllAuthCookies";
import { AuthContext, SetAuthorizedUser } from "./useAuth";

/**
 * it is for containing and "synchronously" updating auth state in
 * 1. Cookies
 * 2. React state
 *
 * it becomes messy if i start adding related network request logic here too
 * so i avoid that.
 *
 * if within components there is need for some helper that deals with both
 * network requests and this state, it may be better to create some custom hook
 * that makes use of `useAuth` and some react query hook under the hood.
 *
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  // state allows to update UI w/o hard-reloads
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getAccessToken()));

  const setAuthorizedUser: SetAuthorizedUser = ({
    accessToken,
    accessTokenExpiresAt,
  }) => {
    setAllAuthCookies({ accessToken, accessTokenExpiresAt });
    setIsLoggedIn(true);
  };

  const removeAuthorizedUser = () => {
    removeAllAuthCookies();
    setIsLoggedIn(false);
  };

  useLoginFromUrl({ setAuthorizedUser });

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setAuthorizedUser, removeAuthorizedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
