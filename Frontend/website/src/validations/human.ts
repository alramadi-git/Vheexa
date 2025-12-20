import z from "zod";

import { zLocationCreate } from "./location";

import { zBirthday, zBirthdayMin, zBirthdayMax } from "./birthday";

import { zPhoneNumber } from "./phone-number";

import { zEmail, zPassword } from "./authentication-credentials";

const zHumanCreate = z
  .object({
    avatar: z.url(),
    location: zLocationCreate,
    username: z.string().nonempty("username is required."),
    birthday: zBirthday,
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
  })
  .strict();
type tHumanCreate = z.infer<typeof zHumanCreate>;

const zHumanFilter = z
  .object({
    search: z.optional(z.string().trim()),
    location: z.optional(z.string().trim()),
    birthday: z.object({
      min: z.optional(zBirthdayMin),
      max: z.optional(zBirthdayMax),
    }),
  })
  .strict();
type tHumanFilter = z.infer<typeof zHumanFilter>;

export type { tHumanCreate, tHumanFilter };
export { zHumanCreate, zHumanFilter };
