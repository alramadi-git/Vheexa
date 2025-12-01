import { tPermissionModel } from "./permission";

type tRoleModel = {
  uuid: string;
  name: string;
  permissions: tPermissionModel[];
  createdAt: string;
  updatedAt: string;
};

export type { tRoleModel };
