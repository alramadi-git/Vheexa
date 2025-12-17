import z from "zod";
import { zRole } from "../role";

import { ePartnerRoleStatusModel } from "@/models/partner/role";

const allowedPermissionUuids = [
  "Partner.Update",
  "Partner.Delete",
  "Branches.Create",
  "Branches.Update",
  "Branches.Read",
  "Branches.Delete",
  "Roles.Create",
  "Roles.Update",
  "Roles.Read",
  "Roles.Delete",
  "Members.Create",
  "Members.Update",
  "Members.Read",
  "Members.Delete",
  "VehicleModels.Create",
  "VehicleModels.Update",
  "VehicleModels.Read",
  "VehicleModels.Delete",
  "VehicleInstances.Create",
  "VehicleInstances.Update",
  "VehicleInstances.Read",
  "VehicleInstances.Delete",
];

const zRoleCreate = z
  .object({
    name: z.string().nonempty("Role name is required."),
    permissions: z.array(z.enum(allowedPermissionUuids)),
    status: z.enum(ePartnerRoleStatusModel),
  })
  .extend(zRole.shape)
  .strict();
type tRoleCreate = z.infer<typeof zRoleCreate>;

export type { tRoleCreate as tRoleCreate };
export { zRoleCreate as zRoleCreate };
