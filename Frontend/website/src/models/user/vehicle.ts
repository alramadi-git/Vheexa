import { tNullable } from "@/types/nullish";

import { tPartnerModel } from "@/models/user/partner";
import { tImageModel } from "@/models/user/image";
import { tVehicleColorModel } from "@/models/user/vehicle-color";

type tVehicleModel = {
  uuid: string;

  partner: tPartnerModel;

  thumbnail: tNullable<tImageModel>;
  images: tImageModel[];

  colors: tVehicleColorModel[];

  name: string;
  description: string;

  manufacturer: string;
  modelYear: string;

  transmission: string;
  fuel: string;
  capacity: number;

  price: number;
  discount: number;

  tags: string[];

  updatedAt: string;
  createdAt: string;
};

export type { tVehicleModel };
