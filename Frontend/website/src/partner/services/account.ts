"use client";

import useService from "@/services/use";

import {
  tRefreshTokensCredentials,
  zRefreshTokensCredentials,
} from "@/validators/refresh-tokens-credentials";

import {
  tLogoutCredentials,
  zLogoutCredentials,
} from "@/validators/logout-credentials";

import { backendApi } from "@/libraries/backend-api";

import { eHttpStatusCode } from "@/enums/http-status-code";

import { tTokensModel } from "@/models/tokens";

import { tSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useAccountService() {
  const service = useService();

  async function refreshTokens(
    credentials: tRefreshTokensCredentials,
  ): Promise<tSuccessService<tTokensModel> | tErrorService> {
    return service.globalCatch(async () => {
      zRefreshTokensCredentials.parse(credentials);

      const response = await backendApi.post(
        "/api/partner/account/refresh-tokens",
        credentials,
      );

      if (response.status !== eHttpStatusCode.ok) {
        throw new Error(response.data);
      }

      const result: tTokensModel = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  async function logout(
    credentials: tLogoutCredentials,
    accessToken: string,
  ): Promise<tSuccessService<null> | tErrorService> {
    return service.globalCatch(async () => {
      zLogoutCredentials.parse(credentials);

      const response = await backendApi.post(
        "/api/partner/account/logout",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status !== eHttpStatusCode.noContent) {
        throw new Error(response.data);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  return {
    refreshTokens,
    logout,
  };
}
