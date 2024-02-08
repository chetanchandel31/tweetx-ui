import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { setAuthFlowUrlBeforeAuth } from "../authFlowUrlBeforeAuth";
import { useAuth } from "../../useAuth";
import { routes } from "@/routes/routes";

/** protected route for logged in user, should be inaccessible before logging in */
export default function AuthorizedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    // before redirecting, store url user was trying to access so we can redirect there post login
    setAuthFlowUrlBeforeAuth(location.pathname + location.search);

    return <Navigate to={routes.auth_login.path} replace />;
  }

  return <>{children}</>;
}
