import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { getResultSchema } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

const schemaPostListPayload = z.object({
  page: z.number(),
  perPage: z.number(),
  postedByUserIds: z.array(z.string()),
});
const schemaPostListResponse = z.object({
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  items: z.array(
    z.object({
      postId: z.string(),
      userId: z.string(),
      content: z.string(),
      createdAtMs: z.number(),
      updatedAtMs: z.number(),
    })
  ),
});
const postList = generateEndpointCaller({
  payloadSchema: schemaPostListPayload,
  responseSchema: schemaPostListResponse,
  url: "/post/list",
});

const resultSchema = getResultSchema(schemaPostListResponse);
type TypeResult = z.infer<typeof resultSchema>;

export type TypePostListPayload = z.infer<typeof schemaPostListPayload>;
export type TypePostListResponse = z.infer<typeof schemaPostListResponse>;

export default function usePostListInfinite(
  payload: TypePostListPayload,
  options?: {}
) {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.post.listInfinite(payload),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TypeResult) =>
      lastPage.isSuccess && lastPage.result.nextPage
        ? lastPage.result.nextPage
        : undefined,
    queryFn: ({ pageParam }) =>
      postList({ ...payload, perPage: payload.perPage, page: pageParam }),
    ...options,
  });
}
