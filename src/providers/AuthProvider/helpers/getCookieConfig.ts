import { config } from "@/config";

export default function getCookieConfig() {
  return {
    path: "/",
    domain: config.authCookieDomain,
  };
}
