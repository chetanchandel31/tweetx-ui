import { config } from "@/config";
import getAccessToken from "@/providers/AuthProvider/helpers/getAccessToken";
import { TypeZodSchema } from "@/types";
import axios, { AxiosError } from "axios";
import { ZodRawShape, z } from "zod";

export const API = axios.create({ baseURL: config.apiBaseUrl });

//a function that runs before each request
// add auth token to req headers, if present
API.interceptors.request.use((req) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

export function generateEndpointCaller<
  ZodObjPayload extends ZodRawShape,
  ZodObjResponse extends ZodRawShape
>({
  payloadSchema,
  responseSchema,
  url,
  method = "post",
}: {
  payloadSchema: TypeZodSchema<ZodObjPayload>;
  responseSchema: TypeZodSchema<ZodObjResponse>;
  url: string;
  method?: string;
}) {
  const wrappedResponseSchema = z.discriminatedUnion("isSuccess", [
    z.object({ isSuccess: z.literal(true), result: responseSchema }),
    z.object({
      isSuccess: z.literal(false),
      errorMessages: z.array(z.string()),
      details: z.any(),
    }),
  ]);

  return async (payload: z.infer<typeof payloadSchema>) => {
    try {
      const result = await API({ url, method, data: payload });

      return wrappedResponseSchema.parse(result.data);
    } catch (error: any) {
      const errorMessages: string[] = [];

      if (error instanceof AxiosError) {
        errorMessages.push(
          error?.response?.data?.errorMessages?.[0] ||
            `Axios error: ${error.message} #iqw2874836`
        );
      } else if (error instanceof z.ZodError) {
        errorMessages.push("Unexpected response");
      } else if (error instanceof Error) {
        errorMessages.push(error.message);
      } else {
        errorMessages.push("Something went wrong. #wyu34876347");
      }

      return { isSuccess: false, details: error, errorMessages } as {
        isSuccess: false;
        errorMessages: string[];
        details?: any;
      };
    }
  };
}
