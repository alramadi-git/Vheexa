import z from "zod";

const zLocationCreate = z
  .object({
    country: z
      .string("country is required.")
      .nonempty("country cannot be empty."),
    city: z.string("city is required.").nonempty("city cannot be empty."),
    street: z.string("street is required.").nonempty("street cannot be empty."),
    latitude: z
      .number("Latitude is required.")
      .min(-90, "latitude cannot be less than -90.")
      .max(90, "latitude cannot be more than 90."),
    longitude: z
      .number("Longitude is required.")
      .min(-180, "longitude cannot be less than -180.")
      .max(180, "longitude cannot be more than 180."),
  })
  .strict();
type tLocationCreate = z.infer<typeof zLocationCreate>;

export type { tLocationCreate };
export { zLocationCreate };
