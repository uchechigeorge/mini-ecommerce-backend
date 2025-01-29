import { z } from "zod";

const nNumber = z.coerce.number().optional().catch(undefined);
const nString = z.string().optional().catch(undefined);
const arrString = z
  .string()
  .optional()
  .transform((e) =>
    e == null
      ? []
      : e
          .toString()
          .split(",")
          .map((e) => e.trim())
  )
  .optional();

export const baseGetParamsSchema = {
  page: nNumber,
  pageSize: nNumber,
  order: nString,
  sort: nString,
  searchString: nString,
  searchStrings: arrString,
  searchColumns: arrString,
  searchOperators: arrString,
  searchStack: arrString,
  id: nNumber,
};
const schema = z.object(baseGetParamsSchema);

export type BaseGetParams = z.infer<typeof schema>;
