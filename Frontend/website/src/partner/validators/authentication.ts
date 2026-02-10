import z from "zod";

import { zPhoneNumber } from "../../validators/phone-number";
import { zEmail, zPassword } from "../../validators/authentication";

const zRegisterCredentials = z
  .object({
    logo: z.optional(
      z
        .file()
        .max(300 * 1024, "logo must be at most 300 KB.")
        .mime(["image/jpeg", "image/png"]),
    ),
    banner: z.optional(
      z
        .file()
        .max(1 * 1024 * 1024, "banner must be at most 1 MB.")
        .mime(["image/jpeg", "image/png"]),
    ),
    handle: z
      .string("handle is required.")
      .trim()
      .min(3, "handle must be at least 3 characters.")
      .min(20, "handle must be at most 20 characters.")
      .regex(
        /^[a-z0-9-_]+$/,
        "handle can only contain lowercase letters, numbers, hyphens and underscores.",
      ),
    organizationName: z
      .string("organization name is required.")
      .trim()
      .min(3, "organization name must be at least 3 characters.")
      .max(80, "organization name must be at most 80 characters."),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    branch: z
      .object({
        location: z
          .object({
            country: z
              .string("country is required.")
              .trim()
              .min(2, "country must be at least 2 characters.")
              .max(56, "country must be at most 56 characters."),
            city: z
              .string("city is required.")
              .trim()
              .min(2, "city must be at least 2 characters.")
              .max(85, "city must be at most 85 characters."),
            street: z
              .string("street is required.")
              .trim()
              .min(3, "street must be at least 3 characters.")
              .max(150, "street must be at most 150 characters."),
            latitude: z
              .number("Latitude is required.")
              .min(-90, "latitude cannot be less than -90.")
              .max(90, "latitude cannot be greater than 90."),
            longitude: z
              .number("Longitude is required.")
              .min(-180, "longitude cannot be less than -180.")
              .max(180, "longitude cannot be greater than 180."),
          })
          .strict(),
        name: z
          .string("branch name is required.")
          .trim()
          .min(2, "branch name must be at least 3 characters.")
          .max(80, "branch name must be at most 25 characters."),
        phoneNumber: zPhoneNumber,
        email: zEmail,
      })
      .strict(),
    member: z
      .object({
        avatar: z.optional(
          z
            .file()
            .max(300 * 1024, "avatar must be at most 300 KB.")
            .mime(["image/jpeg", "image/png"]),
        ),
        username: z
          .string("username is required.")
          .trim()
          .min(3, "username must be at least 3 characters.")
          .max(20, "username must be at most 20 characters."),
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
