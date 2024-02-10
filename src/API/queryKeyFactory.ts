import { QueryFunctionContext } from "@tanstack/react-query";
import { TypeUserGetProfilePayload } from "./react-query/user/useUserGetProfile";

type TypeQueryKey = QueryFunctionContext<[string, string | number]>["queryKey"];

const queryKeyFactory = {
  user: {
    all: ["user"],
    getProfile: (_payload: Partial<TypeUserGetProfilePayload>) => {
      const keys: TypeQueryKey = [
        ...queryKeyFactory.user.all,
        "user-get-profile",
      ];

      return keys;
    },
  },
} as const;

export default queryKeyFactory;
