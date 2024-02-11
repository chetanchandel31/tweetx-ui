import { QueryFunctionContext } from "@tanstack/react-query";
import { TypeUserGetProfilePayload } from "./react-query/user/useUserGetProfile";
import { TypeUserListPayload } from "./react-query/user/useUserListInfinite";
import { TypePostListPayload } from "./react-query/post/usePostListInfinite";

type TypeQueryKey = QueryFunctionContext<
  [string, string | number | Object]
>["queryKey"];

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

    listInfinite: ({
      followedByUserId,
      followerOfUserId,
      page,
      perPage,
    }: Partial<TypeUserListPayload>) => {
      const keys: TypeQueryKey = [
        ...queryKeyFactory.user.all,
        "user-list-infinite",
      ];

      if (page) {
        keys.push({ page });
      }
      if (perPage) {
        keys.push({ perPage });
      }
      if (followedByUserId) {
        keys.push({ followedByUserId });
      }
      if (followerOfUserId) {
        keys.push({ followerOfUserId });
      }

      return keys;
    },
  },

  post: {
    all: ["post"],

    listInfinite: ({
      page,
      perPage,
      postedByUserIds,
    }: Partial<TypePostListPayload>) => {
      const keys: TypeQueryKey = [
        ...queryKeyFactory.post.all,
        "post-list-infinite",
      ];

      if (page) {
        keys.push({ page });
      }
      if (perPage) {
        keys.push({ perPage });
      }
      if (postedByUserIds) {
        keys.push({ postedByUserIds });
      }

      return keys;
    },
  },
} as const;

export default queryKeyFactory;
