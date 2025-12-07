import z from "zod";

const zLocation = z
  .object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })
  .strict();
type tLocation = z.infer<typeof zLocation>;

export type { tLocation };
export { zLocation };
