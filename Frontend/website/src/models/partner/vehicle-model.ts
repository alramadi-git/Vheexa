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
  thumbnail: string;
  gallery: {
    uuid: string;
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
  status: eVehicleModelStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eVehicleModelCategoryModel, eVehicleModelStatusModel };
export type { tVehicleModelModel };
