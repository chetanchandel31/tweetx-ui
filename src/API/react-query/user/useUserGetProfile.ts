import { generateEndpointCaller } from "@/API";
import queryKeyFactory from "@/API/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schemaUserGetProfilePayload = z.object({});

const schemaUserGetProfileResponse = z.object({
  userId: z.string(),
  name: z.string(),
  postsCount: z.number(),
  followedCount: z.number(),
  followersCount: z.number(),
  followedUserIds: z.array(z.string()),
});
const userGetProfile = generateEndpointCaller({
  payloadSchema: schemaUserGetProfilePayload,
  responseSchema: schemaUserGetProfileResponse,
  url: "/user/get-profile",
});

export type TypeUserGetProfilePayload = z.infer<
  typeof schemaUserGetProfilePayload
>;

export default function useUserGetProfile(
  payload: TypeUserGetProfilePayload,
  options?: { staleTime?: number }
) {
  return useQuery({
    queryKey: queryKeyFactory.user.getProfile(payload),
    queryFn: () => userGetProfile(payload),
    ...options,
  });
}
