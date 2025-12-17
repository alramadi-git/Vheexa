import z from "zod";

const zLocation = z
  .object({
    country: z.string().nonempty("Country is required."),
    city: z.string().nonempty("City is required."),
    street: z.string().nonempty("Street is required."),
    latitude: z
      .number()
      .min(-90, "Latitude must be between -90 and 90.")
      .max(90, "Latitude must be between -90 and 90."),
    longitude: z
      .number()
      .min(-180, "Longitude must be between -180 and 180.")
      .max(180, "Longitude must be between -180 and 180."),
  })
  .strict();
type tLocation = z.infer<typeof zLocation>;

export type { tLocation };
export { zLocation };
