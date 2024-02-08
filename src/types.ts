import { ZodRawShape, z } from "zod";

export type TypeSetStateFunction<TypeState> = React.Dispatch<
  React.SetStateAction<TypeState>
>;

export type TypeResult<T> =
  | { isSuccess: true; result: T }
  | { isSuccess: false; errorMessages: string[]; details?: any };

export function getResultSchema<ZodObjShape extends ZodRawShape>(schema: z.ZodObject<ZodObjShape>) {
  return z.discriminatedUnion("isSuccess", [
    z.object({ isSuccess: z.literal(true), result: schema }),
    z.object({
      isSuccess: z.literal(false),
      errorMessages: z.array(z.string()),
      details: z.any(),
    }),
  ]);
}
