import { QueryFunctionContext } from "@tanstack/react-query";
import { TypeUserGetProfilePayload } from "./react-query/user/useUserGetProfile";
import { TypeUserListPayload } from "./react-query/user/useUserListInfinite";

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

    listInfinite: (payload: Partial<TypeUserListPayload>) => {
      const keys: TypeQueryKey = [
        ...queryKeyFactory.user.all,
        "user-list-infinite",
      ];

      if (payload.page) {
        keys.push(payload.page);
      }
      if (payload.perPage) {
        keys.push(payload.perPage);
      }
      if (payload.followedByUserId) {
        keys.push(payload.followedByUserId);
      }
      if (payload.followerOfUserId) {
        keys.push(payload.followerOfUserId);
      }

      return keys;
    },
  },
} as const;

export default queryKeyFactory;
