import { tImageModel } from "../image";

type tVehicleImageModel = Omit<tImageModel, "uuid"> & {
  uuid: string;
  index: number;
  isPublished: boolean;
};

export type { tVehicleImageModel };
