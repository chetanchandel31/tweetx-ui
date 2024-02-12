import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaPostDeletePayload = z.object({
  postId: z.string({ required_error: "Post id is required" }),
});
const schemaPostDeleteResponse = z.object({});

const postDelete = generateEndpointCaller({
  payloadSchema: schemaPostDeletePayload,
  responseSchema: schemaPostDeleteResponse,
  url: "/post/delete",
});

export default function usePostDelete({}: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDelete,
    onSuccess: () => {
      const promises = Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyFactory.post.listInfinite({}),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyFactory.user.getProfile({}),
        }),
      ]);

      return promises;
    },
  });
}
