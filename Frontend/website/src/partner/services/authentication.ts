"use client";

import useService from "@/services/use";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/partner/validators/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { backendApi } from "@/libraries/backend-api";

import { eHttpStatusCode } from "@/enums/http-status-code";

import { tAccountModel } from "@/models/account";
import { tMemberAccountModel } from "@/partner/models/member-account";

import { tSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useAuthenticationService() {
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tMemberAccountModel>> | tErrorService
  > {
    return service.globalCatch<tAccountModel<tMemberAccountModel>>(async () => {
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

      const response = await backendApi.post(
        "/api/partner/authentication/register",
        formData,
      );

      if (response.status !== eHttpStatusCode.created) {
        throw new Error(response.data);
      }

      const result: tAccountModel<tMemberAccountModel> = response.data;
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
    return service.globalCatch<tAccountModel<tMemberAccountModel>>(async () => {
      zLoginCredentials.parse(credentials);

      const response = await backendApi.post(
        "/api/partner/authentication/login",
        JSON.stringify(credentials),
      );

      if (response.status !== eHttpStatusCode.ok) {
        throw new Error(response.data);
      }

      const result: tAccountModel<tMemberAccountModel> = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  return {
    register,
    login,
  };
}
