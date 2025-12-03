import { tRoleModel } from "../role";

enum eMemberRoleStatusModel {
  ACTIVE,
  INACTIVE,
}

type tMemberRoleModel = tRoleModel & {
  status: eMemberRoleStatusModel;
  createdAt: string;
  updatedAt: string;
};

export { eMemberRoleStatusModel };
export type { tMemberRoleModel as tRoleModel };
