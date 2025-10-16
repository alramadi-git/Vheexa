import { tNullable } from "@/types/nullish";

import { tPartner } from "./partner";
import { tVehicleImage } from "./vehicle-image";
import { tVehicleColor } from "./vehicle-color";

type tVehicle = {
  uuid: string;

  partner: tPartner;

  thumbnail: tNullable<tVehicleImage>;
  images: Array<tVehicleImage>;

  colors: Array<tVehicleColor>;

  name: string;
  description: string;

  manufacturer: string;
  modelYear: string; //Date;

  transmission: string;
  fuel: string;
  capacity: number;

  price: number;
  discount: number;

  tags: Array<string>;

  updatedAt: string; //Date;
  createdAt: string; //Date;
};

export type { tVehicle };
