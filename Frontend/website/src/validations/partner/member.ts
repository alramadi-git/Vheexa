import z from "zod";

import { eMemberStatusModel } from "@/models/partner/member";
import { zEmail, zPassword } from "../credentials";

const zMemberCreate = z
  .object({
    avatar: z.nullable(
      z.file().refine((value) => value.type.startsWith("image/"), {
        error: "avatar can only be an image(e.g, png, jpg, etc...).",
      }),
    ),
    role: z.uuid("role is required."),
    branch: z.uuid("branch is required."),
    username: z
      .string("username is required.")
      .nonempty("username cannot be empty.")
      .min(2, "username cannot be less than 2 characters.")
      .max(20, "username cannot be more than 20 characters.")
      .regex(/^[a-zA-Z\s]+$/, "username can only contain letters and spaces."),
    email: zEmail,
    password: zPassword,
    status: z.enum(eMemberStatusModel, "status is required."),
  })
  .strict();
type tMemberCreate = z.infer<typeof zMemberCreate>;

const zMemberFilter = z
  .object({
    search: z.optional(z.string().nonempty("username cannot be empty.")),
    roles: z.array(z.uuid()),
    branches: z.array(z.uuid()),
    status: z.optional(z.enum(eMemberStatusModel, "invalid status.")),
  })
  .strict();
type tMemberFilter = z.infer<typeof zMemberFilter>;

export type { tMemberCreate, tMemberFilter };
export { zMemberCreate, zMemberFilter };
