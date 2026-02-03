import { ePermissionModel } from "./enums/permission";
import { eStatusModel } from "./enums/status";

type tRoleModel = {
  uuid: string;
  name: string;
  permissions: ePermissionModel[];
  assignedCount: number;
  status: eStatusModel;
  createdAt: string;
  updatedAt: string;
};

export type { tRoleModel };
