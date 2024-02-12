import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { config } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaPostUpdatePayload = z.object({
  postId: z.string({ required_error: "Post id is required" }),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content shouldn't be empty" })
    .max(config.postContentMaxLength, {
      message: `Content shouldn't be of more than ${config.postContentMaxLength} characters`,
    }),
});
const schemaPostUpdateResponse = z.object({});

const postUpdate = generateEndpointCaller({
  payloadSchema: schemaPostUpdatePayload,
  responseSchema: schemaPostUpdateResponse,
  url: "/post/update",
});

export default function usePostUpdate({}: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUpdate,
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
