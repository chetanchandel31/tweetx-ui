import { generateEndpointCaller } from "@/API";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaAuthSignInPayload = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password should be of 8 characters atleast." }),
});

const schemaAuthSignInResponse = z.object({
  name: z.string(),
  userId: z.string(),
  authToken: z.string(),
  authTokenExpiresAtMs: z.number(),
});

const authSignIn = generateEndpointCaller({
  payloadSchema: schemaAuthSignInPayload,
  responseSchema: schemaAuthSignInResponse,
  url: "/auth/sign-in",
});

export default function useAuthSignIn({}: Params) {
  return useMutation({
    mutationFn: authSignIn,
  });
}
