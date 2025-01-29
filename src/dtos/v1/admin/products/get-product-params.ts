import { baseGetParamsSchema } from "@dtos/shared/base-get-params";
import { parsedOptionalNumber } from "@helpers/zod-type-helpers";
import { z } from "zod";

export const getAllIProductsQuerySchema = z.object({
  ...baseGetParamsSchema,
  productCategoryId: parsedOptionalNumber,
});

export const getOneProductParamSchema = z.object({ id: z.coerce.number() });

export type GetAllProductsQuery = z.infer<typeof getAllIProductsQuerySchema>;
export type GetOneProductParams = z.infer<typeof getOneProductParamSchema>;
