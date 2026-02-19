"use client";

import useService from "@/services/use-service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/partner/validators/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { tAccountModel } from "@/models/account";
import { tMemberAccountModel } from "@/partner/models/member-account";

import { tErrorService } from "@/services/error";

import { tSuccessService } from "@/services/success";
import { tTokensModel } from "@/models/tokens";
import {
  tRefreshTokenCredentials,
  zRefreshTokenCredentials,
} from "@/validators/refresh-token-credentials";
import { zAccessToken } from "@/validators/tokens";
import {
  tLogoutCredentials,
  zLogoutCredentials,
} from "@/validators/logout-credentials";

export default function useAuthenticationService() {
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tMemberAccountModel>> | tErrorService
  > {
    return service.catch<tAccountModel<tMemberAccountModel>>(async () => {
      zRegisterCredentials.parse(credentials);

      const formData = new FormData();
      if (credentials.logo) {
        formData.append("logo", credentials.logo);
      }

      if (credentials.banner) {
        formData.append("banner", credentials.banner);
      }

      formData.append("handle", credentials.handle);

      formData.append("name", credentials.organizationName);

      formData.append("phoneNumber", credentials.phoneNumber);

      formData.append("email", credentials.email);

      formData.append(
        "branch.location.country",
        credentials.branch.location.country,
      );
      formData.append("branch.location.city", credentials.branch.location.city);
      formData.append(
        "branch.location.street",
        credentials.branch.location.street,
      );
      formData.append(
        "branch.location.latitude",
        credentials.branch.location.latitude.toString(),
      );
      formData.append(
        "branch.location.longitude",
        credentials.branch.location.longitude.toString(),
      );
      formData.append("branch.name", credentials.branch.name);
      formData.append("branch.phoneNumber", credentials.branch.phoneNumber);
      formData.append("branch.email", credentials.branch.email);

      if (credentials.member.avatar) {
        formData.append("member.avatar", credentials.member.avatar);
      }

      formData.append("member.username", credentials.member.username);
      formData.append("member.email", credentials.member.email);
      formData.append("member.password", credentials.member.password);

      formData.append("rememberMe", credentials.rememberMe.toString());

      const response = await service.fetch.post(
        "/api/partner/authentication/register",
        formData,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tAccountModel<tMemberAccountModel> = await response.json();

      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function login(
    credentials: tLoginCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tMemberAccountModel>> | tErrorService
  > {
    return service.catch<tAccountModel<tMemberAccountModel>>(async () => {
      zLoginCredentials.parse(credentials);

      const response = await service.fetch.post(
        "/api/partner/authentication/login",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tAccountModel<tMemberAccountModel> = await response.json();

      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function refreshTokens(
    credentials: tRefreshTokenCredentials,
  ): Promise<tSuccessService<tTokensModel> | tErrorService> {
    return service.catch(async () => {
      zRefreshTokenCredentials.parse(credentials);
      
      const response = await service.fetch.post(
        "/api/partner/authentication/refresh-tokens",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const result: tTokensModel = await response.json();

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
    return service.catch<null>(async () => {
      zLogoutCredentials.parse(credentials);
      zAccessToken.parse(accessToken);

      const response = await service.fetch.post(
        "/api/partner/authentication/logout",
        JSON.stringify(credentials),
        accessToken,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  return {
    register,
    login,
    refreshTokens,
    logout,
  };
}
