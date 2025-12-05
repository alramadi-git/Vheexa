import z from "zod";

import { zPhoneNumber } from "../phone-number";

import { zEmail } from "../email";
import { zPassword } from "../password";

const zPartner = z
  .object({
    logo: z.url(),
    banner: z.url(),
    handle: z.string().lowercase(),
    name: z.string(),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
  })
  .strict();
type tPartner = z.infer<typeof zPartner>;

export type { tPartner };
export { zPartner };
