import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schemaPostGetPayload = z.object({
  postId: z.string({ required_error: "Post id is required" }),
});

const schemaPostGetResponse = z.object({
  postId: z.string(),
  userId: z.string(),
  content: z.string(),
  createdAtMs: z.number(),
  updatedAtMs: z.number(),
});

const postGet = generateEndpointCaller({
  payloadSchema: schemaPostGetPayload,
  responseSchema: schemaPostGetResponse,
  url: "/post/get",
});

export type TypePostGetPayload = z.infer<typeof schemaPostGetPayload>;

export default function usePostGet(payload: TypePostGetPayload) {
  return useQuery({
    queryKey: queryKeyFactory.post.get(payload),
    queryFn: () => postGet(payload),
  });
}
