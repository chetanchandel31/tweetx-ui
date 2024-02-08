import { ACCESS_TOKEN_EXPIRES_AT } from "@/config";
import Cookies from "js-cookie";

export default function getAccessTokenExpiresAt() {
  return Cookies.get(ACCESS_TOKEN_EXPIRES_AT)
    ? Number(Cookies.get(ACCESS_TOKEN_EXPIRES_AT))
    : null;
}
