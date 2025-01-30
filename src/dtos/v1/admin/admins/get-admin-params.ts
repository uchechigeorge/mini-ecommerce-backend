import { baseGetParamsSchema } from "@dtos/shared/base-get-params";
import { z } from "zod";

export const getAllAdminsQuerySchema = z.object({
  ...baseGetParamsSchema,
});

export const getOneAdminParamSchema = z.object({
  id: z.coerce.number(),
});

export type GetAllAdminsQuery = z.infer<typeof getAllAdminsQuerySchema>;
export type GetOneAdminParams = z.infer<typeof getOneAdminParamSchema>;
