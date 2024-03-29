import isProdEnv from "./utils/isProdEnv";

export const config = {
  authCookieDomain: import.meta.env.PROD ? location.hostname : "localhost",
  apiBaseUrl: isProdEnv()
    ? "https://tweetx-api.onrender.com/api"
    : "http://localhost:8000/api",
  zIndex: {
    header: 1100, // more than 1200 will start covering "temporary drawers" and "snackbars"
  },
  postContentMaxLength: 240,
} as const;

export const ACCESS_TOKEN = "_tx-access-token";
export const ACCESS_TOKEN_EXPIRES_AT = "_tx-access-token-expires-at";
export const URL_BEFORE_AUTH = "_tx-url-before-auth";
