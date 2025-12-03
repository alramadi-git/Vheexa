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
  branch: tBranchModel;
  color: tVehicleColorModel;
  plate: string;
  status: eVehicleInstanceStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleInstanceStatusModel };
export type { tVehicleInstanceModel };
