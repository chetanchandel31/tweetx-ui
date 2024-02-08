import { ACCESS_TOKEN } from "@/config";
import Cookies from "js-cookie";

export default function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN);
}
