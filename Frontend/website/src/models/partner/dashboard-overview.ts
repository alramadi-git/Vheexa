type tTotal = {
  active: number;
  inactive: number;
  total: number;
};

type tCountByEntity = {
  name: string;
  count: number;
};

type tDashboardOverviewModel = {
  totals: {
    vehicles: tTotal;
    teamMembers: tTotal;
    branches: tTotal;
    roles: tTotal;
  };

  membersByRole: tCountByEntity[];
  membersByBranch: tCountByEntity[];
  permissionsByRole: tCountByEntity[];

  vehiclePriceDistribution: {
    min: number;
    max: number;
    average: number;
    ranges: {
      from: number;
      to: number;
      vehicleCount: number;
    }[];
  };
};

export type { tDashboardOverviewModel };
