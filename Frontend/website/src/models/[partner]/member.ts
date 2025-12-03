import { tHumanModel } from "./human";

import { tRoleModel } from "./role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = {
  uuid: string;
  human: tHumanModel;
  role: tRoleModel;
  branch: tBranchModel;
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
