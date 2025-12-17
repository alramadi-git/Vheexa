import { tHumanModel } from "../human";

import { tPartnerRoleModel } from "./role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = tHumanModel & {
  role: tPartnerRoleModel;
  branch: tBranchModel;
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
