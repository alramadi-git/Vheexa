import z from "zod";

import { zPhoneNumber } from "../phone-number";
import { zEmail } from "../credentials";
import { ePermission } from "./role";

const zAccount = z
  .object({
    partner: z.object({
      logo: z.nullable(z.url()),
      banner: z.nullable(z.url()),
      handle: z
        .string()
        .nonempty()
        .regex(/^[a-z0-9-_]+$/),
      organizationName: z.string().nonempty(),
      phoneNumber: zPhoneNumber,
      email: zEmail,
    }),
    role: z.object({
      name: z.string().nonempty(),
      permissions: z.array(z.enum(ePermission)).min(1),
    }),
    avatar: z.nullable(z.url()),
    branch: z.object({
      location: z.object({
        country: z.string().nonempty(),
        city: z.string().nonempty(),
        street: z.string().nonempty(),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      }),
      name: z.string().nonempty(),
      phoneNumber: zPhoneNumber,
      email: zEmail,
    }),
    username: z
      .string()
      .nonempty()
      .min(2)
      .max(20)
      .regex(/^[a-zA-Z\s]+$/),
    email: zEmail,
  })
  .strict();
type tAccount = z.infer<typeof zAccount>;

export type { tAccount };
export { zAccount };
