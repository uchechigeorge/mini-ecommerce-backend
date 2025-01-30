import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nNumber = z.coerce.number().nullable().catch(null);
const nBoolean = z.boolean().catch(false);
const nDate = z.coerce.date().nullable().catch(null);

const zPromise = (value: any) => {
  return z
    .object(value)
    .nullish()
    .promise()
    .transform(async (e) => await e)
    .catch(null);
};

export const readProductDtoSchema = z.object({
  id: nNumber,
  name: nString,
  price: nNumber,
  stockQuantity: nNumber,
  description: nString,
  productCategoryId: nNumber,
  productCategory: zPromise({
    id: nNumber,
    name: nString,
  }),
  dateModified: nDate,
  dateCreated: nDate,
});

export type ReadProductDto = z.infer<typeof readProductDtoSchema>;
