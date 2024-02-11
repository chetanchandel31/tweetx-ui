import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { getResultSchema } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";

const schemaUserListPayload = z
  .object({
    page: z.number(),
    perPage: z.number(),
    followedByUserId: z.string().optional(),
    followerOfUserId: z.string().optional(),
  })
  .superRefine((schema, ctx) => {
    if (schema.followedByUserId && schema.followerOfUserId) {
      ctx.addIssue({
        code: "custom",
        message: "Pick one from followedByUserId or followerOfUserId",
        path: ["followedByUserId"],
      });
    }
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

export default function useUserListInfinite(
  payload: TypeUserListPayload,
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.user.listInfinite(payload),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TypeResult) =>
      lastPage.isSuccess && lastPage.result.nextPage
        ? lastPage.result.nextPage
        : undefined,
    queryFn: ({ pageParam }) =>
      userList({ ...payload, perPage: payload.perPage, page: pageParam }),
    ...options,
  });
}
