import z from "zod";

import { eRoleStatusModel } from "@/models/partner/role";

enum ePermission {
  PartnerRead,
  PartnerUpdate,
  PartnerDelete,
  RolesCreate,
  RolesRead,
  RolesUpdate,
  RolesDelete,
  BranchesCreate,
  BranchesRead,
  BranchesUpdate,
  BranchesDelete,
  MembersCreate,
  MembersRead,
  MembersUpdate,
  MembersDelete,
  VehicleModelsCreate,
  VehicleModelsRead,
  VehicleModelsUpdate,
  VehicleModelsDelete,
}

const zRoleCreate = z
  .object({
    name: z
      .string("role name is required.")
      .trim()
      .min(3, "role name must not be less than 3 characters.")
      .max(25, "role name must not be more than 25 characters."),
    permissions: z
      .array(z.enum(ePermission, "invalid permission."))
      .min(1, "you must assign at least 1 permission.")
      .max(19, "you can assign a maximum of 19 permissions."),
    status: z.enum(eRoleStatusModel, "status is required."),
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
      .array(z.enum(ePermission, "invalid permission."))
      .max(19, "you can assign a maximum of 19 permissions."),
    status: z.optional(z.enum(eRoleStatusModel, "invalid status.")),
  })
  .strict();
type tRoleFilter = z.infer<typeof zRoleFilter>;

export { ePermission };

export type { tRoleCreate, tRoleFilter };
export { zRoleCreate, zRoleFilter };
