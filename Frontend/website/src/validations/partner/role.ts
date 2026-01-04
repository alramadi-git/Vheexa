import z from "zod";

import { eRoleStatusModel } from "@/models/partner/role";

enum ePartnerRoleCreatePermission {
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
  VehicleInstancesCreate,
  VehicleInstancesRead,
  VehicleInstancesUpdate,
  VehicleInstancesDelete,
}

const zRoleCreate = z
  .object({
    name: z.string().nonempty("role name must not be empty."),
    permissions: z
      .array(z.enum(ePartnerRoleCreatePermission, "invalid permission."))
      .min(1, "at least one permission is required."),
    status: z.enum(eRoleStatusModel, "invalid status."),
  })
  .strict();
type tRoleCreate = z.infer<typeof zRoleCreate>;

const zRoleFilter = z
  .object({
    name: z.optional(
      z
        .string()
        .nonempty(
          "roles name must not be empty.",
        ),
    ),
    permissions: z.array(
      z.enum(ePartnerRoleCreatePermission, "invalid permission."),
    ),
    status: z.optional(z.enum(eRoleStatusModel, "invalid status.")),
  })
  .strict();
type tRoleFilter = z.infer<typeof zRoleFilter>;

export { ePartnerRoleCreatePermission };

export type { tRoleCreate, tRoleFilter };
export { zRoleCreate, zRoleFilter };
