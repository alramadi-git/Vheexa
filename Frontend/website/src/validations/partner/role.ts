import z from "zod";

import { eRoleStatusModel } from "@/models/partner/role";

enum ePartnerRoleCreatePermission {
  PartnerUpdate,
  PartnerDelete,
  RolesCreate,
  RolesUpdate,
  RolesRead,
  RolesDelete,
  BranchesCreate,
  BranchesUpdate,
  BranchesRead,
  BranchesDelete,
  MembersCreate,
  MembersUpdate,
  MembersRead,
  MembersDelete,
  VehicleModelsCreate,
  VehicleModelsUpdate,
  VehicleModelsRead,
  VehicleModelsDelete,
  VehicleInstancesCreate,
  VehicleInstancesUpdate,
  VehicleInstancesRead,
  VehicleInstancesDelete,
}

const zRoleCreate = z
  .object({
    name: z.string().nonempty("role name is required."),
    permissions: z
      .array(z.enum(ePartnerRoleCreatePermission, "invalid permission."))
      .min(1, "at least one permission is required."),
    status: z.enum(eRoleStatusModel, "invalid status."),
  })
  .strict();
type tRoleCreate = z.infer<typeof zRoleCreate>;

const zRoleFilter = z
  .object({
    name: z.optional(z.string().trim()),
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
