import { generateEndpointCaller } from "@/API";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

type Params = {};

const schemaAuthSignUpPayload = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, { message: "Name should be of 3 characters atleast." }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password should be of 8 characters atleast." }),
});

const schemaAuthSignUpResponse = z.object({
  name: z.string(),
  userId: z.string(),
  authToken: z.string(),
  authTokenExpiresAtMs: z.number(),
});

export const authSignUp = generateEndpointCaller({
  payloadSchema: schemaAuthSignUpPayload,
  responseSchema: schemaAuthSignUpResponse,
  url: "/auth/sign-up",
});

export default function useAuthSignUp({}: Params) {
  return useMutation({
    mutationFn: authSignUp,
  });
}
