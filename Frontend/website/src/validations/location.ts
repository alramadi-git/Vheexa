import z from "zod";

const zLocationCreate = z
  .object({
    country: z.string().nonempty("country is required."),
    city: z.string().nonempty("city is required."),
    street: z.string().nonempty("street is required."),
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
