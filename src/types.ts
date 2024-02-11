import { ZodEffects, ZodObject, ZodRawShape, z } from "zod";

export type TypeSetStateFunction<TypeState> = React.Dispatch<
  React.SetStateAction<TypeState>
>;

export type TypeResult<T> =
  | { isSuccess: true; result: T }
  | { isSuccess: false; errorMessages: string[]; details?: any };
// to extract zod schema's types while building abstractions
export type TypeZodSchema<ZodObj extends ZodRawShape> =
  | ZodObject<ZodObj>
  | ZodEffects<ZodObject<ZodObj>>;

export function getResultSchema<ZodObjShape extends ZodRawShape>(
  schema: TypeZodSchema<ZodObjShape>
) {
  return z.discriminatedUnion("isSuccess", [
    z.object({ isSuccess: z.literal(true), result: schema }),
    z.object({
      isSuccess: z.literal(false),
      errorMessages: z.array(z.string()),
      details: z.any(),
    }),
  ]);
}
