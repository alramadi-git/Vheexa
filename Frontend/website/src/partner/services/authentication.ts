"use client";

import useToken from "@/hooks/partner/token";
import useService from "../../services/use-service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/partner/validators/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { ePermissionModel } from "@/partner/models/enums/permission";

import { tAccountModel } from "@/models/account";
import { tMemberAccountModel } from "@/partner/models/member-account";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessModel } from "@/models/success";
import { tSuccessService } from "@/services/success";

export default function useAuthenticationService() {
  const { token } = useToken();
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    tSuccessService<tAccountModel<tMemberAccountModel>> | tErrorService
  > {
    return service.catch<tAccountModel<tMemberAccountModel>>(async () => {
      zRegisterCredentials.parse(credentials);

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              avatar: null,
              partner: {
                logo: null,
                banner: null,
                handle: "vheexa",
                organizationName: "Vheexa",
                phoneNumber: "+12125550123",
                email: "team@vheexa.com",
              },
              role: {
                name: "Owner",
                permissions: [
                  ePermissionModel.PartnerRead,
                  ePermissionModel.PartnerUpdate,
                  ePermissionModel.PartnerDelete,
                  ePermissionModel.RolesCreate,
                  ePermissionModel.RolesRead,
                  ePermissionModel.RolesUpdate,
                  ePermissionModel.RolesDelete,
                  ePermissionModel.BranchesCreate,
                  ePermissionModel.BranchesRead,
                  ePermissionModel.BranchesUpdate,
                  ePermissionModel.BranchesDelete,
                  ePermissionModel.MembersCreate,
                  ePermissionModel.MembersRead,
                  ePermissionModel.MembersUpdate,
                  ePermissionModel.MembersDelete,
                  ePermissionModel.VehicleModelsCreate,
                  ePermissionModel.VehicleModelsRead,
                  ePermissionModel.VehicleModelsUpdate,
                  ePermissionModel.VehicleModelsDelete,
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
        "/partner/authentication/register",
        formData,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tAccountModel<tMemberAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function login(
    credentials: tLoginCredentials,
  ): Promise<tSuccessService<tAccountModel<tMemberAccountModel>>| tErrorService> {
    return service.catch<tAccountModel<tMemberAccountModel>>(async () => {
      zLoginCredentials.parse(credentials);

      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: {
            account: {
              avatar: null,
              partner: {
                logo: null,
                banner: null,
                handle: "vheexa",
                organizationName: "Vheexa",
                phoneNumber: "+12125550123",
                email: "team@vheexa.com",
              },
              role: {
                name: "Owner",
                permissions: [
                  ePermissionModel.PartnerRead,
                  ePermissionModel.PartnerUpdate,
                  ePermissionModel.PartnerDelete,
                  ePermissionModel.RolesCreate,
                  ePermissionModel.RolesRead,
                  ePermissionModel.RolesUpdate,
                  ePermissionModel.RolesDelete,
                  ePermissionModel.BranchesCreate,
                  ePermissionModel.BranchesRead,
                  ePermissionModel.BranchesUpdate,
                  ePermissionModel.BranchesDelete,
                  ePermissionModel.MembersCreate,
                  ePermissionModel.MembersRead,
                  ePermissionModel.MembersUpdate,
                  ePermissionModel.MembersDelete,
                  ePermissionModel.VehicleModelsCreate,
                  ePermissionModel.VehicleModelsRead,
                  ePermissionModel.VehicleModelsUpdate,
                  ePermissionModel.VehicleModelsDelete,
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
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tAccountModel<tMemberAccountModel>> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function logout(): Promise<tSuccessService<null>| tErrorService> {
    return service.catch<null>(async () => {
      if (process.env.NODE_ENV === "development") {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.post(
        "/partner/authentication/logout",
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
