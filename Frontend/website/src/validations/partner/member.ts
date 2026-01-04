import z from "zod";

import { eMemberStatusModel } from "@/models/partner/member";
import { zEmail, zPassword } from "../authentication-credentials";

const zMemberCreate = z
  .object({
    avatar: z
      .file("expected avatar file (e.g. png, jpg, etc...)")
      .refine((value) => value.type.startsWith("image/"), {
        error: "only images are allowed",
      }),
    role: z.uuid("role is required."),
    branch: z.uuid("branch is required."),
    username: z
      .string("username is required.")
      .nonempty("username must not be empty.")
      .min(2,"username must not be at least 2 characters.")
      .max(20,"username must not be at most 20 characters.")
      .regex(/^[a-zA-Z\s]+$/, "username must be only letters and spaces."),
    email: zEmail,
    password: zPassword,
    status: z.enum(eMemberStatusModel, "invalid status."),
  })
  .strict();
type tMemberCreate = z.infer<typeof zMemberCreate>;

const zMemberFilter = z
  .object({
    search: z.optional(
      z
        .string()
        .nonempty(
          "username can only either be undefined or a non-empty string.",
        ),
    ),
    roles: z.array(z.uuid()),
    branches: z.array(z.uuid()),
    status: z.optional(z.enum(eMemberStatusModel, "invalid status.")),
  })
  .strict();
type tMemberFilter = z.infer<typeof zMemberFilter>;

export type { tMemberCreate, tMemberFilter };
export { zMemberCreate, zMemberFilter };
