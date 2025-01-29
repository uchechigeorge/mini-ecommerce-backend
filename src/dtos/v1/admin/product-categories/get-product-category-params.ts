import { baseGetParamsSchema } from "@dtos/shared/base-get-params";
import { z } from "zod";

export const getAllProductCategoriesQuerySchema = z.object({
  ...baseGetParamsSchema,
});

export const getOneProductCategoryParamSchema = z.object({
  id: z.coerce.number(),
});

export type GetAllProductCategoriesQuery = z.infer<
  typeof getAllProductCategoriesQuerySchema
>;
export type GetOneProductCategoryParams = z.infer<
  typeof getOneProductCategoryParamSchema
>;
