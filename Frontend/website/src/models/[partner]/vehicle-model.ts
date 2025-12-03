import { tImageModel } from "../image";

import { tVehicleImageModel } from "./vehicle-image";
import { tVehicleColorModel } from "./vehicle-color";

enum eVehicleModelTransmissionModel {
  MANUAL,
  AUTOMATIC,
  SEMI_AUTOMATIC,
  CVT,
  DUAL_CLUTCH,
}

enum eVehicleModelFuelModel {
  PETROL_91,
  PETROL_95,
  PETROL_98,
  DIESEL,
  ELECTRIC,
  HYBRID,
  CNG,
  LPG,
  HYDROGEN,
}

enum eVehicleModelStatusModel {
  ACTIVE,
  INACTIVE,
}

type tVehicleModelModel = {
  uuid: string;
  thumbnail: tImageModel;
  images: tVehicleImageModel[];
  colors: tVehicleColorModel[];
  name: string;
  description: string;
  manufacturer: string;
  modelYear: string;
  transmission: eVehicleModelTransmissionModel;
  capacity: number;
  fuel: eVehicleModelFuelModel;
  price: number;
  discount: number;
  tags: string[];
  status: eVehicleModelStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleModelTransmissionModel, eVehicleModelFuelModel, eVehicleModelStatusModel };
export type { tVehicleModelModel };
