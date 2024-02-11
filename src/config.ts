import isProdEnv from "./utils/isProdEnv";

export const config = {
  authCookieDomain: import.meta.env.PROD ? location.hostname : "localhost",
  apiBaseUrl: isProdEnv()
    ? "http://localhost:8000/api"
    : "http://localhost:8000/api",
} as const;

export const ACCESS_TOKEN = "_tx-access-token";
export const ACCESS_TOKEN_EXPIRES_AT = "_tx-access-token-expires-at";
export const URL_BEFORE_AUTH = "_tx-url-before-auth";
