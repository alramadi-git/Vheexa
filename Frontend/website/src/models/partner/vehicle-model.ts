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

enum eVehicleModelStatusModel {
  active,
  inactive,
}

type tVehicleModelModel = {
  uuid: string;
  thumbnail: tImageModel;
  gallery: tVehicleImageModel[];
  name: string;
  description: string;
  category: eVehicleModelCategoryModel;
  manufacturer: string;
  modelYear: number;
  capacity: number;
  transmission: string;
  fuel: string;
  colors: tVehicleColorModel[];
  price: number;
  discount: number;
  tags: string;
  status: eVehicleModelStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleModelCategoryModel, eVehicleModelStatusModel };
export type { tVehicleModelModel };
