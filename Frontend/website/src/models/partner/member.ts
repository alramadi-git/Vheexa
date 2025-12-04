import { tHumanModel } from "../general/human";

import { tMemberRoleModel } from "./member-role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = tHumanModel & {
  role: tMemberRoleModel;
  branch: tBranchModel;
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
