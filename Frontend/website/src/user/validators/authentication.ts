import z from "zod";

import { zPhoneNumber } from "../../validators/phone-number";
import { zEmail, zPassword } from "../../validators/authentication";

const zRegisterCredentials = z
  .object({
    avatar: z.optional(
      z
        .file()
        .max(300 * 1024, "avatar must be at most 300 KB.")
        .mime(["image/jpeg", "image/png"]),
    ),
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
          .min(-90, "latitude must not be less than -90.")
          .max(90, "latitude must not be greater than 90."),
        longitude: z
          .number("Longitude is required.")
          .min(-180, "longitude must not be less than -180.")
          .max(180, "longitude must not be greater than 180."),
      })
      .strict(),
    username: z
      .string("username is required.")
      .trim()
      .min(3, "username must be at least 3 characters.")
      .max(20, "username must be at most 20 characters."),
    birthday: z
      .date()
      .refine((date) => {
        const today = new Date();
        const minDate = new Date();

        minDate.setFullYear(today.getFullYear() - 100);

        return date >= minDate;
      }, "birthday must be less than 100 years or older.")
      .refine((date) => {
        const today = new Date();
        const minDate = new Date();

        minDate.setFullYear(today.getFullYear() - 18);

        return date <= minDate;
      }, "birthday must be 18 years or older."),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
    rememberMe: z.boolean(),
  })
  .strict();
type tRegisterCredentials = z.infer<typeof zRegisterCredentials>;

export type { tRegisterCredentials };
export { zRegisterCredentials };
