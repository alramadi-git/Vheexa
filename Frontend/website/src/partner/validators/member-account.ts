import z from "zod";

import { ePermissionModel } from "../models/enums/permission";

const zMemberAccount = z
  .object({
    partner: z
      .object({
        logo: z.nullable(
          z
            .object({
              id: z.string(),
              url: z.string(),
            })
            .strict(),
        ),
        banner: z.nullable(
          z
            .object({
              id: z.string(),
              url: z.string(),
            })
            .strict(),
        ),
        handle: z.string(),
        organizationName: z.string(),
        phoneNumber: z.string(),
        email: z.string(),
      })
      .strict(),
    role: z
      .object({
        name: z.string(),
        permissions: z.array(z.enum(ePermissionModel)),
      })
      .strict(),
    avatar: z.nullable(
      z
        .object({
          id: z.string(),
          url: z.string(),
        })
        .strict(),
    ),
    branch: z
      .object({
        location: z
          .object({
            country: z.string(),
            city: z.string(),
            street: z.string(),
            latitude: z.number(),
            longitude: z.number(),
          })
          .strict(),
        name: z.string(),
        phoneNumber: z.string(),
        email: z.string(),
      })
      .strict(),
    username: z.string(),
    email: z.string(),
  })
  .strict();
type tMemberAccount = z.infer<typeof zMemberAccount>;

export type { tMemberAccount };
export { zMemberAccount };
