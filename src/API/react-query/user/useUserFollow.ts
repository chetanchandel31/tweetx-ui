import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaUserFollowPayload = z.object({
  userToFollowId: z.string({ required_error: "User id is required" }),
});

const schemaUserFollowResponse = z.object({});

const userFollow = generateEndpointCaller({
  payloadSchema: schemaUserFollowPayload,
  responseSchema: schemaUserFollowResponse,
  url: "/user/follow",
});

export default function useUserFollow({}: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userFollow,
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
