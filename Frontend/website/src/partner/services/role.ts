"use client";

import useToken from "@/hooks/partner/token";
import useService from "../../services/use-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tRoleCreate,
  tRoleFilter,
  zRoleCreate,
  zRoleFilter,
} from "@/partner/validators/role";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { eEnvironment } from "@/enums/environment";

import { ePermissionModel } from "../models/enums/permission";
import { eStatusModel } from "../models/enums/status";

import { tRoleModel } from "@/partner/models/role";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessModel, tPaginatedSuccessModel } from "@/models/success";
import { tSuccessService, tPaginatedSuccessService } from "@/services/success";

export default function useRoleService() {
  const { token } = useToken();
  const service = useService();

  async function create(
    role: tRoleCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zRoleCreate.parse(role);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.post(
        "/partner/dashboard/roles",
        JSON.stringify(role),
        token,
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
  async function read(
    uuid: tUuid,
  ): Promise<tSuccessService<tRoleModel> | tErrorService> {
    return await service.catch<tRoleModel>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: {
            uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
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
            assignedCount: 1,
            status: eStatusModel.active,
            createdAt: "2024-02-10T09:15:00Z",
            updatedAt: "2024-10-05T11:40:22Z",
          },
        };
      }

      const response = await service.fetch.get(
        `/partner/dashboard/roles/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tSuccessModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.delete(
        `/partner/dashboard/roles/${uuid}`,
        token,
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
  async function search(
    filter: tRoleFilter,
    pagination: tPagination,
  ): Promise<tPaginatedSuccessService<tRoleModel> | tErrorService> {
    return await service.catch<tRoleModel>(async () => {
      zRoleFilter.parse(filter);
      zPagination.parse(pagination);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
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
              assignedCount: 1,
              status: eStatusModel.active,
              createdAt: "2024-02-10T09:15:00Z",
              updatedAt: "2024-10-05T11:40:22Z",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
              permissions: [
                ePermissionModel.BranchesRead,
                ePermissionModel.MembersRead,
                ePermissionModel.MembersUpdate,
                ePermissionModel.VehicleModelsRead,
              ],
              assignedCount: 3,
              status: eStatusModel.active,
              createdAt: "2024-03-15T10:20:00Z",
              updatedAt: "2024-11-28T14:35:10Z",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 2 },
        };
      }

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("Filter.Name", filter.name);

      clsQuery.set(
        "Filter.Permissions",
        filter.permissions.map((permission) => permission.toString()),
      );

      clsQuery.set("Filter.Status", filter.status?.toString());

      clsQuery.set("Pagination.Page", pagination.page?.toString());
      clsQuery.set("Pagination.PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/partner/dashboard/roles${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedSuccessModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    read,
    delete: _delete,
    search,
  };
}
