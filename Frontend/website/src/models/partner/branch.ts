import { tLocationModel } from "../location";

enum eBranchStatusModel {
  active,
  inactive,
}

type tBranchModel = {
  uuid: string;
  location: tLocationModel;
  name: string;
  phoneNumber: string;
  email: string;
  vehicleInstanceCount: number;
  memberCount: number;
  status: eBranchStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eBranchStatusModel };
export type { tBranchModel };
