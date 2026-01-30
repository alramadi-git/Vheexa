import z from "zod";

import { zLocationCreate } from "../location";

import { zPhoneNumber } from "../phone-number";
import { zEmail, zPassword } from "../credentials";

const zRegisterCredentials = z
  .object({
    logo: z.optional(
      z.file().refine((value) => value.type.startsWith("image/"), {
        error: "logo can only be an image(e.g, png, jpg, etc...).",
      }),
    ),
    banner: z.optional(
      z.file().refine((value) => value.type.startsWith("image/"), {
        error: "banner can only be an image(e.g, png, jpg, etc...).",
      }),
    ),
    handle: z
      .string("handle is required.")
      .nonempty("handle cannot be empty.")
      .regex(
        /^[a-z0-9-_]+$/,
        "handle can only contain lowercase letters, numbers, hyphens and underscores.",
      ),
    organizationName: z
      .string("partner name is required.")
      .nonempty("partner name cannot be empty."),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    branch: z
      .object({
        location: zLocationCreate,
        name: z
          .string("branch name is required.")
          .nonempty("branch name cannot be empty."),
        phoneNumber: zPhoneNumber,
        email: zEmail,
      })
      .strict(),
    member: z
      .object({
        avatar: z.optional(
          z.file().refine((value) => value.type.startsWith("image/"), {
            error: "avatar can only be an image(e.g, png, jpg, etc...).",
          }),
        ),
        username: z
          .string("username is required.")
          .nonempty("username cannot be empty."),
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
