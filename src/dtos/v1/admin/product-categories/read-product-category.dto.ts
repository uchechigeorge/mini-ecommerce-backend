import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nNumber = z.coerce.number().nullable().catch(null);
const nDate = z.coerce.date().nullable().catch(null);

export const readProductCategoryDtoSchema = z.object({
  id: nNumber,
  name: nString,
  dateModified: nDate,
  dateCreated: nDate,
});

export type ReadProductCategoryDto = z.infer<
  typeof readProductCategoryDtoSchema
>;
