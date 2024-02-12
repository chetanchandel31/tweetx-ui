import { config } from "@/config";
import isProdEnv from "@/utils/isProdEnv";
import { useEffect } from "react";

export default function useApiWakeUp() {
  useEffect(() => {
    // so api is already being awakened while user is hopefully using auth form
    if (isProdEnv()) {
      fetch(config.apiBaseUrl);
    }
  }, []);
}
