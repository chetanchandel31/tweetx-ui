import { z } from "zod";
import { generateEndpointCaller } from "../..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeyFactory from "../../queryKeyFactory";
import { config } from "@/config";

type Params = {};

const schemaPostCreatePayload = z.object({
  content: z
    .string({ required_error: "Content is required" })
    .max(config.postContentMaxLength, {
      message: `Content shouldn't be of more than ${config.postContentMaxLength} characters`,
    }),
});
const schemaPostCreateResponse = z.object({});

const postCreate = generateEndpointCaller({
  payloadSchema: schemaPostCreatePayload,
  responseSchema: schemaPostCreateResponse,
  url: "/post/create",
});

export default function usePostCreate({}: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreate,
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
