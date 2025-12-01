import { tHumanModel } from "../human";

import { tPartnerModel } from "./partner";
import { tRoleModel } from "./role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  ACTIVE,
  INACTIVE,
}

type tMemberModel = tHumanModel & {
  partner: tPartnerModel;
  role: tRoleModel;
  branch: tBranchModel;
  status: eMemberStatusModel;
};

export { eMemberStatusModel };
export type { tMemberModel };
