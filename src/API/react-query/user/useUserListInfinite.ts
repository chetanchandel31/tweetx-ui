import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { getResultSchema } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

const schemaUserListPayload = z.object({
  page: z.number(),
  perPage: z.number(),
});
const schemaUserListResponse = z.object({
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  items: z.array(
    z.object({
      userId: z.string(),
      isFollowed: z.boolean(),
      followersCount: z.number(),
      name: z.string(),
    })
  ),
});

const userList = generateEndpointCaller({
  payloadSchema: schemaUserListPayload,
  responseSchema: schemaUserListResponse,
  url: "/user/list",
});

const resultSchema = getResultSchema(schemaUserListResponse);
type TypeResult = z.infer<typeof resultSchema>;

export type TypeUserListPayload = z.infer<typeof schemaUserListPayload>;
export type TypeUserListResponse = z.infer<typeof schemaUserListResponse>;

export default function useUserListInfinite(payload: TypeUserListPayload) {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.user.listInfinite(payload),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TypeResult) =>
      lastPage.isSuccess && lastPage.result.nextPage
        ? lastPage.result.nextPage
        : undefined,
    queryFn: ({ pageParam }) =>
      userList({ perPage: payload.perPage, page: pageParam }),
  });
}
