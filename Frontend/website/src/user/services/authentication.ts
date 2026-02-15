"use client";

import useToken from "@/user/hooks/token";
import useUserService from "../../user/services/use-user-service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/user/validators/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { tAccountModel } from "@/models/account";
import { tUserAccountModel } from "@/user/models/user-account";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessService } from "@/services/success";

export default function useAuthenticationService() {
  const { token } = useToken();
  const service = useUserService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tUserAccountModel>> | tErrorService
  > {
    return service.catch<tAccountModel<tUserAccountModel>>(async () => {
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

      const response = await service.fetch.post(
        "/authentication/register",
        formData,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tAccountModel<tUserAccountModel> = await response.json();

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
    return service.catch<tAccountModel<tUserAccountModel>>(async () => {
      zLoginCredentials.parse(credentials);

      const response = await service.fetch.post(
        "/authentication/login",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tAccountModel<tUserAccountModel> = await response.json();

      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function logout(): Promise<tSuccessService<null> | tErrorService> {
    return service.catch<null>(async () => {
      if (true === true) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.post(
        "/authentication/logout",
        undefined,
        token ?? undefined,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
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
    logout,
  };
}
