"use client";

import useToken from "@/hooks/partner/token";
import useService from "../hook";

import { eEnvironment } from "@/enums/environment";

import { tOverviewModel } from "@/models/partner/overview";

import { tSuccessOneModel } from "@/models/success";
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
            businesses: {
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
            breakdowns: {
              permissionsByRole: [
                { name: "Inventory Management", count: 45 },
                { name: "Customer Management", count: 38 },
                { name: "Sales Reporting", count: 32 },
                { name: "Service Scheduling", count: 28 },
                { name: "Financial Access", count: 15 },
                { name: "Admin Controls", count: 8 },
              ],
              membersByRole: [
                { name: "Sales Agent", count: 35 },
                { name: "Mechanic", count: 22 },
                { name: "Branch Manager", count: 12 },
                { name: "Service Advisor", count: 8 },
                { name: "Admin Staff", count: 5 },
                { name: "Finance Officer", count: 3 },
              ],
              membersByBranch: [
                { name: "Downtown Center", count: 28 },
                { name: "Northgate Branch", count: 22 },
                { name: "Westside Hub", count: 18 },
                { name: "Eastwood Office", count: 15 },
                { name: "Central Plaza", count: 12 },
                { name: "Other Branches", count: 5 },
              ],
            },
            vehicleModelPriceDistribution: {
              min: 38,
              max: 650,
              average: 129,
              ranges: [
                { from: 0, to: 49, vehicleModelsCount: 4 },
                { from: 50, to: 99, vehicleModelsCount: 6 },
                { from: 100, to: 149, vehicleModelsCount: 5 },
                { from: 150, to: 199, vehicleModelsCount: 2 },
                { from: 200, to: 299, vehicleModelsCount: 2 },
                { from: 300, to: null, vehicleModelsCount: 1 },
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

      const data: tSuccessOneModel<tOverviewModel> = await response.json();
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
