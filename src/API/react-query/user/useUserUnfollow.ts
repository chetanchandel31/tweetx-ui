import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaUserUnFollowPayload = z.object({
  userToUnFollowId: z.string({ required_error: "User id is required" }),
});

const schemaUserUnFollowResponse = z.object({});

const userUnfollow = generateEndpointCaller({
  payloadSchema: schemaUserUnFollowPayload,
  responseSchema: schemaUserUnFollowResponse,
  url: "/user/unfollow",
});

export default function useUserUnfollow({}: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUnfollow,
    onSuccess: () => {
      const promises = Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyFactory.user.listInfinite({}),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyFactory.user.getProfile({}),
        }),
      ]);

      return promises;
    },
  });
}
