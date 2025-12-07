import z from "zod";

import { zLocation } from "./location";
import { zBirthday } from "./birthday";

import { zPhoneNumber } from "./phone-number";

import { zEmail } from "./email";
import { zPassword } from "./password";

const zHuman = z
  .object({
    avatar: z.url(),
    location: zLocation,
    username: z.string().nonempty(),
    birthday: zBirthday,
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
  })
  .strict();
type tHuman = z.infer<typeof zHuman>;

export type { tHuman };
export { zHuman };
