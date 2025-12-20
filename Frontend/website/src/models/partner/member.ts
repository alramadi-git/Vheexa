import { tHumanModel } from "../human";

import { tRoleModel } from "./role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = tHumanModel & {
  role: Omit<tRoleModel, "assignedCount">;
  branch: Omit<tBranchModel, "memberCount"|"vehicleInstanceCount" >;
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
