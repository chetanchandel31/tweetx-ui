import moment from "moment";
import Cookies from "js-cookie";
import getCookieConfig from "./getCookieConfig";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_AT } from "@/config";

export default function setAllAuthCookies({
  accessToken,
  accessTokenExpiresAt,
}: {
  accessToken: string;
  accessTokenExpiresAt: number;
}) {
  const cookieConfig = getCookieConfig();

  Cookies.set(ACCESS_TOKEN, accessToken, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
    expires: moment.unix(accessTokenExpiresAt).toDate(),
  });
  Cookies.set(ACCESS_TOKEN_EXPIRES_AT, String(accessTokenExpiresAt), {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
    expires: moment.unix(accessTokenExpiresAt).toDate(),
  });
}
