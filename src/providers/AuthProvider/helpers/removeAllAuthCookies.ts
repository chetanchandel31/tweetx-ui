import Cookies from "js-cookie";
import getCookieConfig from "./getCookieConfig";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_AT } from "@/config";

export default function removeAllAuthCookies() {
  const cookieConfig = getCookieConfig();

  Cookies.remove(ACCESS_TOKEN, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
  });
  Cookies.remove(ACCESS_TOKEN_EXPIRES_AT, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
  });
}
