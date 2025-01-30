import { z } from "zod";

const nString = z.string().nullable().catch(null);
const nNumber = z.coerce.number().nullable().catch(null);
const nDate = z.coerce.date().nullable().catch(null);

export const readAdminDtoSchema = z.object({
  id: nNumber,
  email: nString,
  firstName: nString,
  lastName: nString,
  fullName: nString,
  dateModified: nDate,
  dateCreated: nDate,
});

export type ReadAdminDto = z.infer<typeof readAdminDtoSchema>;
