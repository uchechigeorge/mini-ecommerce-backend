import { z } from "zod";

const rString = z.string().trim().min(1);
const oString = z.string().optional();
const rNumber = z.coerce.number();
const oNumber = z.coerce.number().optional();

export const updateProductDtoSchema = z.object({
  name: rString,
  description: oString,
  price: rNumber,
  stockQuantity: rNumber,
  productCategoryId: oNumber,
});

export const updateProductParamSchema = z.object({ id: z.coerce.number() });

export type UpdateProductDto = z.infer<typeof updateProductDtoSchema>;
export type UpdateProductParams = z.infer<typeof updateProductParamSchema>;
