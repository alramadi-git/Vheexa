import { tLocationModel } from "./location";

enum eBranchStatusModel {
  active,
  inactive,
}

type tBranchModel = {
  uuid: string;
  location: tLocationModel;
  status: eBranchStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eBranchStatusModel };
export type { tBranchModel };
