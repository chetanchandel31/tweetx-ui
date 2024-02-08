import { useContext } from "react";

import { createContext } from "react";

export type SetAuthorizedUser = ({}: {
  accessToken: string;
  accessTokenExpiresAt: number;
}) => void;

type AuthContextInterface = {
  isLoggedIn: boolean;
  setAuthorizedUser: SetAuthorizedUser;
  removeAuthorizedUser: () => void;
};

const logWarning = () =>
  console.warn("the component probably isn't wrapped with auth-context");

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  setAuthorizedUser: logWarning,
  removeAuthorizedUser: logWarning,
});

export const useAuth = () => useContext(AuthContext);
