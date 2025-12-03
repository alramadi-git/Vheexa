import { tLocationModel } from "../location";

enum eBranchStatusModel {
  ACTIVE,
  INACTIVE,
}

type tBranchModel = tLocationModel & {
  status: eBranchStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eBranchStatusModel };
export type { tBranchModel };
