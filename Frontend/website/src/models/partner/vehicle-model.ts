import { tImageModel } from "../image";

import { tVehicleImageModel } from "./vehicle-image";
import { tVehicleColorModel } from "./vehicle-color";

enum eVehicleModelCategoryModel {
  car,
  van,
  truck,
  motorcycle,
  boat,
  yacht,
  jetSki,
  helicopter,
}

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
  thumbnail: tImageModel;
  images: tVehicleImageModel[];
  name: string;
  description: string;
  category: eVehicleModelCategoryModel;
  manufacturer: string;
  modelYear: number;
  capacity: number;
  transmission: eVehicleModelTransmissionModel;
  fuel: eVehicleModelFuelModel;
  colors: tVehicleColorModel[];
  price: number;
  discount: number;
  tags: string;
  status: eVehicleModelStatusModel;
  updatedAt: string;
  createdAt: string;
};

export {
  eVehicleModelCategoryModel,
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
};
export type { tVehicleModelModel };
