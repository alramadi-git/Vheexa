import { tVehicleColorModel } from "./vehicle-color";
import { tBranchModel } from "./branch";

enum eVehicleInstanceStatusModel {
  available,
  unavailable,
  rented,
  maintenance,
}

type tVehicleInstanceModel = {
  uuid: string;
  branch: tBranchModel;
  color: tVehicleColorModel;
  plate: string;
  status: eVehicleInstanceStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleInstanceStatusModel };
export type { tVehicleInstanceModel };
