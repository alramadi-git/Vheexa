"use client";

import useService from "@/services/use";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/user/validators/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { backendApi } from "@/libraries/backend-api";

import { eHttpStatusCode } from "@/enums/http-status-code";

import { tAccountModel } from "@/models/account";
import { tUserAccountModel } from "@/user/models/user-account";

import { tSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useAuthenticationService() {
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tUserAccountModel>> | tErrorService
  > {
    return service.globalCatch(async () => {
      zRegisterCredentials.parse(credentials);

      const formData = new FormData();
      if (credentials.avatar) {
        formData.append("avatar", credentials.avatar);
      }

      formData.append("location.country", credentials.location.country);
      formData.append("location.city", credentials.location.city);
      formData.append("location.street", credentials.location.street);
      formData.append(
        "location.latitude",
        credentials.location.latitude.toString(),
      );
      formData.append(
        "location.longitude",
        credentials.location.longitude.toString(),
      );

      formData.append("username", credentials.username);

      formData.append(
        "birthday",
        credentials.birthday.toISOString().split("T")[0],
      );

      formData.append("phoneNumber", credentials.phoneNumber);

      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      formData.append("rememberMe", credentials.rememberMe.toString());

      const response = await backendApi.post(
        "/api/user/authentication/register",
        formData,
      );

      if (response.status !== eHttpStatusCode.created) {
        throw new Error(response.data);
      }

      const result: tAccountModel<tUserAccountModel> = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function login(
    credentials: tLoginCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tUserAccountModel>> | tErrorService
  > {
    return service.globalCatch(async () => {
      zLoginCredentials.parse(credentials);

      const response = await backendApi.post(
        "/api/user/authentication/login",
        credentials,
      );

      if (response.status !== eHttpStatusCode.ok) {
        throw new Error(response.data);
      }

      const result: tAccountModel<tUserAccountModel> = response.data;
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
