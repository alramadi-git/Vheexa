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

import { tSuccessModel } from "@/models/success";
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

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              avatar: null,
              location: {
                country: "United States",
                city: "New York",
                street: "Main Street",
                latitude: 40.7128,
                longitude: -74.006,
              },
              username: "Nawaf Alramadi",
              birthday: new Date("9/9/20"),
              phoneNumber: "+12125550123",
              email: "user@vheexa.com",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjcwMDAwMDAwLCJleHAiOjE2NzAwMDM2MDB9.L2ZP6DgPgnU_u4aRMI0K9R0U4Y3D6zXWPR7KzfrQGbQ",
          },
        };
      }

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

      formData.append("birthday", credentials.birthday.toISOString().split("T")[0]);

      formData.append("phoneNumber", credentials.phoneNumber);

      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      formData.append(
        "rememberMe",
        credentials.rememberMe.toString(),
      );

      const response = await service.fetch.post(
        "/authentication/register",
        formData,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tAccountModel<tUserAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
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

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              avatar: null,
              location: {
                country: "United States",
                city: "New York",
                street: "Main Street",
                latitude: 40.7128,
                longitude: -74.006,
              },
              username: "Nawaf Alramadi",
              birthday: new Date("9/9/202"),
              phoneNumber: "+12125550123",
              email: "user@vheexa.com",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjcwMDAwMDAwLCJleHAiOjE2NzAwMDM2MDB9.L2ZP6DgPgnU_u4aRMI0K9R0U4Y3D6zXWPR7KzfrQGbQ",
          },
        };
      }

      const response = await service.fetch.post(
        "/authentication/login",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tAccountModel<tUserAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function logout(): Promise<tSuccessService<null> | tErrorService> {
    return service.catch<null>(async () => {
      if (process.env.NODE_ENV === "development") {
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
