import moment from "moment";
import { useEffect } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import getAccessToken from "../getAccessToken";
import { SetAuthorizedUser } from "../../useAuth";

export default function useLoginFromUrl({
  setAuthorizedUser,
}: {
  setAuthorizedUser: SetAuthorizedUser;
}) {
  const [query, setQuery] = useQueryParams({
    "access-token": StringParam,
  });
  const accessToken = query["access-token"];

  useEffect(() => {
    if (accessToken) {
      const currentAccessToken = getAccessToken();

      if (accessToken !== currentAccessToken) {
        setAuthorizedUser({
          accessToken,
          // get this from url if needed
          accessTokenExpiresAt: moment().add(1, "day").unix(),
        });
      }
      setQuery({ "access-token": null });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
}
