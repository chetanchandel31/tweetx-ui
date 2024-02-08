import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  getAuthFlowUrlBeforeAuth,
  removeAuthFlowUrlBeforeAuth,
} from "../authFlowUrlBeforeAuth";
import { useAuth } from "../../useAuth";
import { routes } from "@/routes/routes";

const getPreferredAuthorizedRoute = () => {
  let preferredAuthorizedRoute: string = routes.feed.path;
  const authFlowUrlBeforeAuth = getAuthFlowUrlBeforeAuth();

  if (authFlowUrlBeforeAuth.sessionStorage) {
    preferredAuthorizedRoute = authFlowUrlBeforeAuth.sessionStorage;
    removeAuthFlowUrlBeforeAuth.sessionStorage();
  } else if (authFlowUrlBeforeAuth.cookies) {
    preferredAuthorizedRoute = authFlowUrlBeforeAuth.cookies;
    removeAuthFlowUrlBeforeAuth.cookies();
  }

  return preferredAuthorizedRoute;
};

/** view that will be used for logging in, but should be inaccessible once user is logged in */
export default function AuthScreen({ children }: { children: ReactNode }) {
  const auth = useAuth();
  if (auth.isLoggedIn) {
    return <Navigate to={getPreferredAuthorizedRoute()} replace />;
  }

  return <>{children}</>;
}
