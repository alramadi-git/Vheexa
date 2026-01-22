"use client";

import useToken from "@/hooks/partner/token";
import useService from "../hook";

import { eEnvironment } from "@/enums/environment";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneService } from "@/services/service";
import { tDashboardOverviewModel } from "@/models/partner/dashboard-overview";

export default function useDashboardOverview() {
  const { token } = useToken();
  const service = useService();

  async function read(): Promise<tResponseOneService<tDashboardOverviewModel>> {
    return await service.catch<tDashboardOverviewModel>(async () => {
      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: {},
        };
      }

      const response = await service.fetch.get(
        "/partner/dashboard/overview",
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tSuccessOneModel<tDashboardOverviewModel> =
        await response.json();
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
