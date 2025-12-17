import { tRoleModel } from "./role";

enum ePartnerRoleStatusModel {
  active,
  inactive,
}

type tPartnerRoleModel = tRoleModel & {
  assignedCount: number;
  status: ePartnerRoleStatusModel;
  createdAt: string;
  updatedAt: string;
};

export { ePartnerRoleStatusModel };
export type { tPartnerRoleModel };
