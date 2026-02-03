import z from "zod";

import { ePermissionService } from "./enums/permission";
import { eStatusService } from "./enums/status";

const zRoleCreate = z
  .object({
    name: z
      .string("role name is required.")
      .trim()
      .min(3, "role name must not be less than 3 characters.")
      .max(25, "role name must not be more than 25 characters."),
    permissions: z
      .array(z.enum(ePermissionService, "invalid permission."))
      .min(1, "you must assign at least 1 permission.")
      .max(19, "you can assign a maximum of 19 permissions."),
    status: z.enum(eStatusService, "status is required."),
  })
  .strict();
type tRoleCreate = z.infer<typeof zRoleCreate>;

const zRoleFilter = z
  .object({
    name: z.optional(
      z
        .string()
        .trim()
        .nonempty("role name must not be empty.")
        .max(25, "role name must not be more than 25 characters."),
    ),
    permissions: z
      .array(z.enum(ePermissionService, "invalid permission."))
      .max(19, "you can assign a maximum of 19 permissions."),
    status: z.optional(z.enum(eStatusService, "invalid status.")),
  })
  .strict();
type tRoleFilter = z.infer<typeof zRoleFilter>;

export type { tRoleCreate, tRoleFilter };
export { zRoleCreate, zRoleFilter };
