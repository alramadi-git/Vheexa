import { tNullable } from "@/types/nullish";

type tTotal = {
  active: number;
  inactive: number;
  total: number;
};

type tCountByEntity = {
  name: string;
  count: number;
};

type tOverviewModel = {
  businesses: {
    roles: tTotal;
    branches: tTotal;
    members: tTotal;
    vehicleModels: tTotal;
  };
  breakdowns: {
    permissionsByRole: tCountByEntity[];
    membersByRole: tCountByEntity[];
    membersByBranch: tCountByEntity[];
  };
  vehicleModelPriceDistribution: {
    min: number;
    max: number;
    average: number;
    ranges: {
      from: number;
      to: tNullable<number>;
      vehicleModelsCount: number;
    }[];
  };
};

export type { tOverviewModel };
