"use client";

import useToken from "@/partner/hooks/token";
import usePartnerService from "./use-partner-service";

import { tOverviewModel } from "@/partner/models/overview";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessService } from "@/services/success";

export default function useOverview() {
  const { token } = useToken();
  const service = usePartnerService();

  async function read(): Promise<
    tSuccessService<tOverviewModel> | tErrorService
  > {
    console.log("Reading overview data...");
    return await service.catch<tOverviewModel>(async () => {
      const response = await service.fetch.get(
        "/api/partner/dashboard/overview",
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
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
