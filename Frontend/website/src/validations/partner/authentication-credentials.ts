import z from "zod";

import { zMemberCreate } from "./member";

import { zPhoneNumber } from "../phone-number";

import { zEmail, zPassword } from "../authentication-credentials";

const zRegisterCredentials = z
  .object({
    partner: z
      .object({
        logo: z.url(),
        banner: z.url(),
        handle: z
          .string()
          .nonempty("partner handle is required.")
          .regex(
            /^[a-z0-9-_]+$/,
            "handle can only contain lowercase letters, numbers, hyphens and underscores.",
          ),
        name: z.string().nonempty("partner name is required."),
        phoneNumber: zPhoneNumber,
        email: zEmail,
        password: zPassword,
        receiveNews: z.boolean(),
      })
      .strict(),
    member: zMemberCreate,
    rememberMe: z.boolean(),
  })
  .strict();
type tRegisterCredentials = z.infer<typeof zRegisterCredentials>;

export type { tRegisterCredentials };
export { zRegisterCredentials };
