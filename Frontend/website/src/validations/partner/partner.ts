import z from "zod";

import { zPhoneNumber } from "../phone-number";

import { zEmail } from "../email";
import { zPassword } from "../password";

const zPartner = z
  .object({
    logo: z.url(),
    banner: z.url(),
    handle: z
      .string()
      .nonempty("Partner handle is required.")
      .regex(
        /^[a-z0-9-_]+$/,
        "Handle can only contain lowercase letters, numbers, hyphens and underscores.",
      ),
    name: z.string().nonempty("Partner name is required."),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
    receiveNews: z.boolean(),
  })
  .strict();
type tPartner = z.infer<typeof zPartner>;

export type { tPartner };
export { zPartner };
