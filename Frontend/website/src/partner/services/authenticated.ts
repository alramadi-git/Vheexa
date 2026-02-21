"use client";

import useService from "@/services/use";
import useAccount from "../hooks/account";

import { tSuccessService, tPaginatedService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useAuthenticatedService() {
  const service = useService();
  const account = useAccount();

  async function wrapper<gtData>(
    callback: (
      token: string,
    ) => Promise<tSuccessService<gtData> | tPaginatedService<gtData>>,
  ): Promise<
    tSuccessService<gtData> | tPaginatedService<gtData> | tErrorService
  > {
    const response = await service.globalCatch(() =>
      callback(account!.account.accessToken),
    );

    if (!response.isSuccess && response.message === "Expired access token") {
      const accessToken = await account!.refreshTokens();
      if (!accessToken) {
        return response;
      }

      return await callback(accessToken.accessToken);
    }
    return response;
  }

  if (account === undefined) {
    return undefined;
  }
  return {
    wrapper,
  };
}
