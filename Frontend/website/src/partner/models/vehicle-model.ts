import { eVehicleModelCategoryModel } from "./enums/vehicle-model";
import { eStatusModel } from "./enums/status";

type tVehicleModelModel = {
  uuid: string;
  thumbnail: string;
  gallery: {
    id: string;
    url: string;
  }[];
  name: string;
  description: string;
  category: eVehicleModelCategoryModel;
  manufacturer: string;
  marketLaunch: string;
  capacity: number;
  transmission: string;
  fuel: string;
  price: number;
  discount: number;
  tags: string;
  status: eStatusModel;
  updatedAt: string;
  createdAt: string;
};

export type { tVehicleModelModel };
