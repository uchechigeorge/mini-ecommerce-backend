import { z } from "zod";

export const parsedOptionalNumber = z
  .string()
  .trim()
  .or(z.number())
  .nullish()
  .transform((e) => (e == undefined || e == "" ? undefined : e))
  .pipe(z.coerce.number().optional().catch(undefined));

export const parsedBoolean = z
  .string()
  .trim()
  .nullish()
  .transform((e) => e != null && e.toLowerCase() == "true")
  .or(z.boolean())
  .pipe(z.boolean().optional().catch(false));

export const parsedNullableBoolean = z
  .string()
  .trim()
  .nullish()
  .transform((e) => {
    switch (e) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return undefined;
    }
  })
  .or(z.boolean())
  .pipe(z.boolean().optional());

export const stringToDate = z
  .string()
  .nullish()
  .transform((e) => e ?? undefined)
  .pipe(z.coerce.date());

export const stringToNullableDate = z
  .string()
  .nullish()
  .transform((e) => e ?? undefined)
  .pipe(z.coerce.date().optional().catch(undefined));
