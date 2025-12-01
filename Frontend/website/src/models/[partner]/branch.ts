import { tLocationModel } from "../location";

type tBranchModel = Omit<tLocationModel, "uuid"> & {
  uuid: string;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
};

export type { tBranchModel };
