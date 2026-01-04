import z from "zod";

import { zLocationCreate } from "../location";

import { zPhoneNumber } from "../phone-number";
import { zEmail, zPassword } from "../authentication-credentials";

const zRegisterCredentials = z
  .object({
    partner: z
      .object({
        logo: z
          .file("expected logo file (e.g. png, jpg, etc...)")
          .refine((value) => value.type.startsWith("image/"), {
            error: "only images are allowed",
          }),
        banner: z
          .file("expected banner file (e.g. png, jpg, etc...)")
          .refine((value) => value.type.startsWith("image/"), {
            error: "only images are allowed",
          }),
        handle: z
          .string("partner handle is required.")
          .nonempty("partner must not be empty.")
          .regex(
            /^[a-z0-9-_]+$/,
            "handle can only contain lowercase letters, numbers, hyphens and underscores.",
          ),
        name: z
          .string("partner name is required.")
          .nonempty("partner name must not be empty."),
        phoneNumber: zPhoneNumber,
        email: zEmail,
        password: zPassword,
      })
      .strict(),
    branch: z
      .object({
        name: z
          .string("branch name is required.")
          .nonempty("branch name must not be empty."),
        location: zLocationCreate,
        phoneNumber: zPhoneNumber,
        email: zEmail,
      })
      .strict(),
    member: z
      .object({
        avatar: z
          .file("expected thumbnail file (e.g. png, jpg, etc...)")
          .refine((value) => value.type.startsWith("image/"), {
            error: "only images are allowed",
          }),
        username: z
          .string("username is required.")
          .nonempty("username must be not empty."),
        email: zEmail,
        password: zPassword,
      })
      .strict(),
    rememberMe: z.boolean(),
  })
  .strict();
type tRegisterCredentials = z.infer<typeof zRegisterCredentials>;

export type { tRegisterCredentials };
export { zRegisterCredentials };
