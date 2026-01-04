import z from "zod";

const zLocationCreate = z
  .object({
    country: z.string("country is required.").nonempty("country must not be empty."),
    city: z.string("city is required.").nonempty("city must not be empty."),
    street: z.string("street is required.").nonempty("street must not be empty."),
    latitude: z
      .number()
      .min(-90, "latitude must be between -90 and 90.")
      .max(90, "latitude must be between -90 and 90."),
    longitude: z
      .number()
      .min(-180, "longitude must be between -180 and 180.")
      .max(180, "longitude must be between -180 and 180."),
  })
  .strict();
type tLocationCreate = z.infer<typeof zLocationCreate>;

export type { tLocationCreate };
export { zLocationCreate };
