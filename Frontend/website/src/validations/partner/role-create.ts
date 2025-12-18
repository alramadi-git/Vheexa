import z from "zod";

import { ePartnerRoleStatusModel } from "@/models/partner/partner-role";

enum ePartnerRoleCreatePermission {
  PartnerUpdate,
  PartnerDelete,
  BranchesCreate,
  BranchesUpdate,
  BranchesRead,
  BranchesDelete,
  RolesCreate,
  RolesUpdate,
  RolesRead,
  RolesDelete,
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

const zPartnerRoleCreate = z
  .object({
    name: z.string().nonempty("Role name is required."),
    permissions: z
      .array(z.enum(ePartnerRoleCreatePermission, "Invalid permission."))
      .min(1, "At least one permission is required."),
    status: z.enum(ePartnerRoleStatusModel),
  })
  .strict();
type tPartnerRoleCreate = z.infer<typeof zPartnerRoleCreate>;

export { ePartnerRoleCreatePermission };
export type { tPartnerRoleCreate };
export { zPartnerRoleCreate };
