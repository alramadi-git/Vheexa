import z from "zod";

import { zEmail, zPassword } from "../../validators/authentication";

import { eStatusService } from "./enums/status";

const zMemberCreate = z
  .object({
    avatar: z.nullable(
      z
        .file()
        .max(300 * 1024 , "avatar must be at most 300 KB.")
        .mime("image/"),
    ),
    roleUuid: z.uuid("role is required."),
    branchUuid: z.uuid("branch is required."),
    username: z
      .string("username is required.")
      .trim()
      .min(3, "username must be at least 3 characters.")
      .max(20, "username must be at most 20 characters."),
    email: zEmail,
    password: zPassword,
    status: z.enum(eStatusService, "status is required."),
  })
  .strict();
type tMemberCreate = z.infer<typeof zMemberCreate>;

const zMemberFilter = z
  .object({
    search: z.optional(
      z
        .string()
        .trim()
        .nonempty("search must not be empty.")
        .max(256, "search must be at most 256 characters."),
    ),
    roleUuids: z.array(z.uuid()),
    branchUuids: z.array(z.uuid()),
    status: z.optional(z.enum(eStatusService, "invalid status.")),
  })
  .strict();
type tMemberFilter = z.infer<typeof zMemberFilter>;

export type { tMemberCreate, tMemberFilter };
export { zMemberCreate, zMemberFilter };
