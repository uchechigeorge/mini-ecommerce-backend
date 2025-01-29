import { z } from "zod";

export const deleteProductParamSchema = z.object({ id: z.coerce.number() });

export type DeleteProductParams = z.infer<typeof deleteProductParamSchema>;
