import { z } from "zod";

const rString = z.string().trim().min(1);
const oString = z.string().optional();
const rNumber = z.coerce.number();
const oNumber = z.coerce.number().optional();

export const createProductDtoSchema = z.object({
  name: rString,
  description: oString,
  price: rNumber,
  stockQuantity: rNumber,
  productCategoryId: oNumber,
});

export type CreateProductDto = z.infer<typeof createProductDtoSchema>;
