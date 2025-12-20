import { tRoleModel as tBasedRoleModel } from "../role";

enum eRoleStatusModel {
  active,
  inactive,
}

type tRoleModel = tBasedRoleModel & {
  assignedCount: number;
  status: eRoleStatusModel;
  createdAt: string;
  updatedAt: string;
};

export { eRoleStatusModel };
export type { tRoleModel };
