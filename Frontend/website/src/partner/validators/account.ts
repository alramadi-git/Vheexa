import z from "zod";

import { ePermissionModel } from "../models/enums/permission";

const zAccount = z
  .object({
    partner: z.object({
      logo: z.nullable(
        z.object({
          id: z.string(),
          url: z.string(),
        }),
      ),
      banner: z.nullable(
        z.object({
          id: z.string(),
          url: z.string(),
        }),
      ),
      handle: z.string(),
      organizationName: z.string(),
      phoneNumber: z.string(),
      email: z.string(),
    }),
    role: z.object({
      name: z.string(),
      permissions: z.array(z.enum(ePermissionModel)),
    }),
    avatar: z.nullable(
      z.object({
        id: z.string(),
        url: z.string(),
      }),
    ),
    branch: z.object({
      location: z.object({
        country: z.string(),
        city: z.string(),
        street: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }),
      name: z.string(),
      phoneNumber: z.string(),
      email: z.string(),
    }),
    username: z.string(),
    email: z.string(),
  })
  .strict();
type tAccount = z.infer<typeof zAccount>;

export type { tAccount };
export { zAccount };
