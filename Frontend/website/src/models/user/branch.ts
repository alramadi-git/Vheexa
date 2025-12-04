import { tLocationModel } from "../general/location";

type tBranchModel = tLocationModel & {
  updatedAt: string;
  createdAt: string;
};

export type { tBranchModel };
