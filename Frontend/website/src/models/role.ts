import { tPermissionModel } from "./permission";

type tRoleModel = {
  uuid: string;
  name: string;
  permissions: tPermissionModel[];
};

export type { tRoleModel };
