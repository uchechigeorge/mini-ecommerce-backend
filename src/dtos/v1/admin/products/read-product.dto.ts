import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nNumber = z.coerce.number().nullable().catch(null);
const nBoolean = z.boolean().catch(false);
const nDate = z.coerce.date().nullable().catch(null);

export const readProductDtoSchema = z.object({
  id: nNumber,
  name: nString,
  price: nNumber,
  stockQuantity: nNumber,
  description: nString,
  productCategoryId: nNumber,
  dateModified: nDate,
  dateCreated: nDate,
});

export type ReadProductDto = z.infer<typeof readProductDtoSchema>;
