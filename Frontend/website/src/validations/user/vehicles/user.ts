import z from "zod";

import { zLocationCreate } from "../../location";

import { zBirthday } from "../../birthday";

import { zPhoneNumber } from "@/validations/phone-number";

import { zEmail, zPassword } from "../../credentials";

const zUserCreate = z
  .object({
    avatar: z.nullable(
      z.file().refine((value) => value.type.startsWith("image/"), {
        error: "avatar can only be an image(e.g, png, jpg, etc...).",
      }),
    ),
    location: zLocationCreate,
    username: z.string().nonempty("username is required."),
    birthday: zBirthday,
    phoneNumber: zPhoneNumber,
    email: zEmail,
    password: zPassword,
  })
  .strict();
type tUserCreate = z.infer<typeof zUserCreate>;

export type { tUserCreate };
export { zUserCreate };
