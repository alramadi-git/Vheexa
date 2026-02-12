type tEntityOverviewModel = {
  active: number;
  inactive: number;
  total: number;
};

type tEntityCountModel = {
  groupName: string;
  count: number;
};

type tOverviewModel = {
  entitiesOverview: {
    roles: tEntityOverviewModel;
    branches: tEntityOverviewModel;
    members: tEntityOverviewModel;
    vehicleModels: tEntityOverviewModel;
  };
  groupCounts: {
    permissionsByRole: tEntityCountModel[];
    membersByRole: tEntityCountModel[];
    membersByBranch: tEntityCountModel[];
  };
  vehicleModelPriceDistribution: {
    min: number;
    max: number;
    average: number;
    ranges: {
      from: number;
      to: number;
      count: number;
    }[];
  };
};

export type { tOverviewModel };
