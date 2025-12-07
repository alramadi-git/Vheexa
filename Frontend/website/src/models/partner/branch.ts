import { tLocationModel } from "../location";

enum eBranchStatusModel {
  active,
  inactive,
}

type tBranchModel = tLocationModel & {
  status: eBranchStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eBranchStatusModel };
export type { tBranchModel };
