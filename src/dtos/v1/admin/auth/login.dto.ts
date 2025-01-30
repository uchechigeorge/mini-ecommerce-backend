import { z } from "zod";

const rString = z.string().trim().min(1);

export const loginDtoSchema = z.object({
  email: rString,
  password: rString,
});

export type LoginDto = z.infer<typeof loginDtoSchema>;
