import { tVehicleModelModel } from "./vehicle-model";
import { tVehicleColorModel } from "./vehicle-color";

import { tBranchModel } from "./branch";

enum eVehicleInstanceStatusModel {
  AVAILABLE,
  UNAVAILABLE,
  RENTED,
  MAINTENANCE,
}

type tVehicleInstanceModel = {
  uuid: string;
  vehicle: tVehicleModelModel;
  color: tVehicleColorModel;
  branch: tBranchModel;
  plate: string;
  status: eVehicleInstanceStatusModel;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleInstanceStatusModel };
export type { tVehicleInstanceModel };
