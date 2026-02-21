"use client";

import useAuthenticatedService from "./authenticated";

import { backendApi } from "@/libraries/backend-api";

import { eHttpStatusCode } from "@/enums/http-status-code";

import { tOverviewModel } from "@/partner/models/overview";

import { tSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useOverviewService() {
  const authenticatedService = useAuthenticatedService();

  async function read(): Promise<
    tSuccessService<tOverviewModel> | tErrorService
  > {
    return await authenticatedService!.wrapper<tOverviewModel>(
      async (token) => {
        const response = await backendApi.get(
          "/api/partner/dashboard/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response);

        if (response.status !== eHttpStatusCode.ok) {
          throw new Error(response.data);
        }

        const result: tOverviewModel = await response.data;
        return {
          isSuccess: true,
          data: result,
        };
      },
    );
  }

  if (authenticatedService === undefined) {
    return undefined;
  }

  return {
    read,
  };
}
