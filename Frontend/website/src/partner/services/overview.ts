"use client";

import useToken from "@/partner/hooks/tokens";
import useService from "@/services/use";

import { tOverviewModel } from "@/partner/models/overview";

import { tErrorService } from "@/services/error";

import { tSuccessService } from "@/services/success";

export default function useOverview() {
  const { accessToken: token } = useToken();
  const service = useService();

  async function read(): Promise<
    tSuccessService<tOverviewModel> | tErrorService
  > {
    return await service.globalCatch<tOverviewModel>(async () => {
      const response = await service.fetch.get(
        "/api/partner/dashboard/overview",
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tOverviewModel = await response.json();
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  return {
    read,
  };
}
