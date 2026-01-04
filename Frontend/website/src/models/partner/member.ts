import { tNullable } from "@/types/nullish";

import { tImageModel } from "../image";
import { tRoleModel } from "./role";
import { tBranchModel } from "./branch";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = {
  uuid: string;
  avatar: tNullable<tImageModel>;
  role: Omit<tRoleModel, "assignedCount">;
  branch: Omit<tBranchModel, "memberCount" | "vehicleInstanceCount">;
  username: string;
  email: string;
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
