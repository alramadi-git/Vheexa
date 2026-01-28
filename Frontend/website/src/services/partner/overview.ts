"use client";

import useToken from "@/hooks/partner/token";
import useService from "../hook";

import { eEnvironment } from "@/enums/environment";

import { tOverviewModel } from "@/models/partner/overview";

import { tSuccessModel } from "@/models/success";
import { tResponseOneService } from "@/services/service";

export default function useOverview() {
  const { token } = useToken();
  const service = useService();

  async function read(): Promise<tResponseOneService<tOverviewModel>> {
    return await service.catch<tOverviewModel>(async () => {
      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: {
            entitiesOverview: {
              roles: {
                active: 8,
                inactive: 2,
                total: 10,
              },
              branches: {
                active: 12,
                inactive: 3,
                total: 15,
              },
              members: {
                active: 85,
                inactive: 15,
                total: 100,
              },
              vehicleModels: {
                active: 128,
                inactive: 42,
                total: 170,
              },
            },
            groupedCounts: {
              permissionsByRole: [
                { groupName: "Inventory Management", count: 45 },
                { groupName: "Customer Management", count: 38 },
                { groupName: "Sales Reporting", count: 32 },
                { groupName: "Service Scheduling", count: 28 },
                { groupName: "Financial Access", count: 15 },
                { groupName: "Admin Controls", count: 8 },
              ],
              membersByRole: [
                { groupName: "Sales Agent", count: 35 },
                { groupName: "Mechanic", count: 22 },
                { groupName: "Branch Manager", count: 12 },
                { groupName: "Service Advisor", count: 8 },
                { groupName: "Admin Staff", count: 5 },
                { groupName: "Finance Officer", count: 3 },
              ],
              membersByBranch: [
                { groupName: "Downtown Center", count: 28 },
                { groupName: "Northgate Branch", count: 22 },
                { groupName: "Westside Hub", count: 18 },
                { groupName: "Eastwood Office", count: 15 },
                { groupName: "Central Plaza", count: 12 },
                { groupName: "Other Branches", count: 5 },
              ],
            },
            vehicleModelPriceDistribution: {
              min: 38,
              max: 650,
              average: 129,
              ranges: [
                { from: 0, to: 49, count: 4 },
                { from: 50, to: 99, count: 6 },
                { from: 100, to: 149, count: 5 },
                { from: 150, to: 199, count: 2 },
                { from: 200, to: 299, count: 2 },
                { from: 300, to: 467, count: 1 },
              ],
            },
          },
        };
      }

      const response = await service.fetch.get(
        "/partner/dashboard/overview",
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tSuccessModel<tOverviewModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  return {
    read,
  };
}
