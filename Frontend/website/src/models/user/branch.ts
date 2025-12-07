import { tLocationModel } from "../location";

type tBranchModel = tLocationModel & {
  updatedAt: string;
  createdAt: string;
};

export type { tBranchModel };
