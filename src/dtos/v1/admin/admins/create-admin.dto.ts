import { z } from "zod";

const rString = z.string().trim().min(1);
const oString = z.string().optional();

export const createAdminDtoSchema = z.object({
  email: rString,
  password: rString,
  firstName: oString,
  lastName: oString,
});

export type CreateAdminDto = z.infer<typeof createAdminDtoSchema>;
