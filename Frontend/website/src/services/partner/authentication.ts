"use client";

import useService from "../hook";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/credentials";

import { tBaseAccountModel } from "@/models/base-account";
import { tAccountModel } from "@/models/partner/account";

import { tSuccessOneModel } from "@/models/success";
import { tResponseOneService } from "@/services/service";

export default function useAuthenticationService() {
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<tBaseAccountModel<tAccountModel>>> {
    return service.catch<tBaseAccountModel<tAccountModel>>(async () => {
      zRegisterCredentials.parse(credentials);

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              uuid: "d3b07384-d9a5-4e3a-9f94-71f0aefc8b4f",
              avatar: null,
              partner: {
                uuid: "6f1e8e41-5cac-4c06-9c78-2b1bb9a5f8ae",
                logo: null,
                banner: null,
                handle: "vheexa",
                name: "Vheexa",
                phoneNumber: "+12125550123",
                email: "team@vheexa.com",
              },
              role: {
                name: "Owner",
                permissions: [
                  "partners:read",
                  "partners:update",
                  "partners:delete",
                  "roles:create",
                  "roles:read",
                  "roles:update",
                  "roles:delete",
                  "branches:create",
                  "branches:read",
                  "branches:update",
                  "branches:delete",
                  "members:create",
                  "members:read",
                  "members:update",
                  "members:delete",
                  "vehicleModels:create",
                  "vehicleModels:read",
                  "vehicleModels:update",
                  "vehicleModels:delete",
                  "vehicleInstances:create",
                  "vehicleInstances:read",
                  "vehicleInstances:update",
                  "vehicleInstances:delete",
                ],
              },
              branch: {
                location: {
                  country: "United States",
                  city: "New York",
                  street: "Main Street",
                  latitude: 40.7128,
                  longitude: -74.006,
                },
                name: "Main Branch",
                phoneNumber: "+12125550123",
                email: "main.branch@vheexa.com",
              },
              username: "Nawaf Alramadi",
              email: "member@vheexa.com",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjcwMDAwMDAwLCJleHAiOjE2NzAwMDM2MDB9.L2ZP6DgPgnU_u4aRMI0K9R0U4Y3D6zXWPR7KzfrQGbQ",
          },
        };
      }

      const formData = new FormData();
      if (credentials.partner.logo) {
        formData.append("partner.logo", credentials.partner.logo);
      }

      if (credentials.partner.banner) {
        formData.append("partner.banner", credentials.partner.banner);
      }

      formData.append("partner.handle", credentials.partner.handle);
      formData.append("partner.name", credentials.partner.name);
      formData.append("partner.phoneNumber", credentials.partner.phoneNumber);
      formData.append("partner.email", credentials.partner.email);
      formData.append("partner.password", credentials.partner.password);

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
        "/partner/authentication/register",
        formData,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tSuccessOneModel<tBaseAccountModel<tAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function login(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<tBaseAccountModel<tAccountModel>>> {
    return service.catch<tBaseAccountModel<tAccountModel>>(async () => {
      zLoginCredentials.parse(credentials);

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              uuid: "d3b07384-d9a5-4e3a-9f94-71f0aefc8b4f",
              avatar: null,
              partner: {
                uuid: "6f1e8e41-5cac-4c06-9c78-2b1bb9a5f8ae",
                logo: null,
                banner: null,
                handle: "vheexa",
                name: "Vheexa",
                phoneNumber: "+12125550123",
                email: "team@vheexa.com",
              },
              role: {
                name: "Owner",
                permissions: [
                  "partners:read",
                  "partners:update",
                  "partners:delete",
                  "roles:create",
                  "roles:read",
                  "roles:update",
                  "roles:delete",
                  "branches:create",
                  "branches:read",
                  "branches:update",
                  "branches:delete",
                  "members:create",
                  "members:read",
                  "members:update",
                  "members:delete",
                  "vehicleModels:create",
                  "vehicleModels:read",
                  "vehicleModels:update",
                  "vehicleModels:delete",
                  "vehicleInstances:create",
                  "vehicleInstances:read",
                  "vehicleInstances:update",
                  "vehicleInstances:delete",
                ],
              },
              branch: {
                location: {
                  country: "United States",
                  city: "New York",
                  street: "Main Street",
                  latitude: 40.7128,
                  longitude: -74.006,
                },
                name: "Main Branch",
                phoneNumber: "+12125550123",
                email: "main.branch@vheexa.com",
              },
              username: "Nawaf Alramadi",
              email: "member@vheexa.com",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjcwMDAwMDAwLCJleHAiOjE2NzAwMDM2MDB9.L2ZP6DgPgnU_u4aRMI0K9R0U4Y3D6zXWPR7KzfrQGbQ",
          },
        };
      }

      const response = await service.fetch.post(
        "/partner/authentication/login",
        JSON.stringify(credentials),
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tSuccessOneModel<tBaseAccountModel<tAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function logout(): Promise<tResponseOneService<null>> {
    return service.catch<null>(async () => {
      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.get(
        "/partner/authentication/logout",
      );

      if (!response.ok) {
        throw new Error(await response.text());
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
