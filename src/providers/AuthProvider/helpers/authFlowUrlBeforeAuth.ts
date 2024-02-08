import Cookies from "js-cookie";
import getCookieConfig from "./getCookieConfig";
import { URL_BEFORE_AUTH } from "@/config";

export const getAuthFlowUrlBeforeAuth = () => {
  return {
    cookies: Cookies.get(URL_BEFORE_AUTH),
    sessionStorage: sessionStorage.getItem(URL_BEFORE_AUTH),
  };
};

export const setAuthFlowUrlBeforeAuth = (url: string) => {
  const cookieConfig = getCookieConfig();

  sessionStorage.setItem(URL_BEFORE_AUTH, url);
  Cookies.set(URL_BEFORE_AUTH, url, {
    domain: cookieConfig.domain,
    path: cookieConfig.path,
  });
};

export const removeAuthFlowUrlBeforeAuth = {
  cookies: () => {
    const cookieConfig = getCookieConfig();

    Cookies.remove(URL_BEFORE_AUTH, {
      domain: cookieConfig.domain,
      path: cookieConfig.path,
    });
  },
  sessionStorage: () => sessionStorage.removeItem(URL_BEFORE_AUTH),
};
