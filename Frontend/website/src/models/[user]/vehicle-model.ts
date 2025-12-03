import { tPartnerModel } from "./partner";

import { tImageModel } from "./image";

import { tVehicleImageModel } from "./vehicle-image";
import { tVehicleColorModel } from "./vehicle-color";

enum eVehicleModelTransmissionModel {
  manual,
  automatic,
  semiAutomatic,
  cvt,
  dualClutch,
}

enum eVehicleModelFuelModel {
  petrol91,
  petrol95,
  petrol98,
  diesel,
  electric,
  hybrid,
  cng,
  lpg,
  hydrogen,
}

enum eVehicleModelStatusModel {
  active,
  inactive,
}

type tVehicleModelModel = {
  uuid: string;
  partner: tPartnerModel;
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

export {
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
};
export type { tVehicleModelModel };
