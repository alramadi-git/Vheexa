import z from "zod";

const zUserAccount = z
  .object({
    avatar: z.nullable(
      z.object({
        id: z.string(),
        url: z.string(),
      }),
    ),
    location: z
      .object({
        country: z.string(),
        city: z.string(),
        street: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .strict(),
    username: z.string(),
    birthday: z.date(),
    phoneNumber: z.string(),
    email: z.string(),
  })
  .strict();
type tUserAccount = z.infer<typeof zUserAccount>;

export type { tUserAccount };
export { zUserAccount };
