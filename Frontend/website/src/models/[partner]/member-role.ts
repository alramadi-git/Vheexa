import { tRoleModel } from "./role";

enum eMemberRoleStatusModel {
  active,
  inactive,
}

type tMemberRoleModel = {
  uuid: string;
  role: tRoleModel;
  status: eMemberRoleStatusModel;
  createdAt: string;
  updatedAt: string;
};

export { eMemberRoleStatusModel };
export type { tMemberRoleModel };
