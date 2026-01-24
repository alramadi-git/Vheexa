"use client";

import useToken from "@/hooks/partner/token";
import useService from "../hook";

import { ClsQuery } from "@/libraries/query";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tRoleCreate,
  tRoleFilter,
  zRoleCreate,
  zRoleFilter,
} from "@/validations/partner/role";

import { tPagination, zPagination } from "@/validations/pagination";

import { eEnvironment } from "@/enums/environment";
import { eRoleStatusModel, tRoleModel } from "@/models/partner/role";

import { tSuccessModel, tPaginationSuccessModel } from "@/models/success";
import { tResponseOneService, tResponseManyService } from "@/services/service";

export default function useRoleService() {
  const { token } = useToken();
  const service = useService();

  async function create(role: tRoleCreate): Promise<tResponseOneService<null>> {
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
        throw new Error(await response.text());
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  async function readOne(
    uuid: tUuid,
  ): Promise<tResponseOneService<tRoleModel>> {
    return await service.catch<tRoleModel>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: {
            uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
            name: "Owner",
            permissions: [
              {
                uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
                name: "Partner Read",
                description: "Read partner information and details.",
              },
              {
                uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
                name: "Partner Update",
                description: "Update partner information and settings.",
              },
              {
                uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
                name: "Partner Delete",
                description: "Delete partner accounts and associated data.",
              },
              {
                uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8g",
                name: "Roles Create",
                description: "Create new roles within the organization.",
              },
              {
                uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8g9h",
                name: "Roles Read",
                description: "View all roles and their permissions.",
              },
              {
                uuid: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8g9h0i",
                name: "Roles Update",
                description: "Update role permissions and settings.",
              },
              {
                uuid: "g7b8c9d0-e1f2-4a3b-4c5d-6e7f8g9h0i1j",
                name: "Roles Delete",
                description: "Delete existing roles from the system.",
              },
              {
                uuid: "h8c9d0e1-f2a3-4b4c-5d6e-7f8g9h0i1j2k",
                name: "Branches Create",
                description: "Create new branches or locations.",
              },
              {
                uuid: "i9d0e1f2-a3b4-4c5d-6e7f-8g9h0i1j2k3l",
                name: "Branches Read",
                description: "View all branches and their details.",
              },
              {
                uuid: "j0e1f2a3-b4c5-4d6e-7f8g-9h0i1j2k3l4m",
                name: "Branches Update",
                description: "Update branch information and settings.",
              },
              {
                uuid: "k1f2a3b4-c5d6-4e7f-8g9h-0i1j2k3l4m5n",
                name: "Branches Delete",
                description: "Delete branches from the system.",
              },
              {
                uuid: "l2a3b4c5-d6e7-4f8g-9h0i-1j2k3l4m5n6o",
                name: "Members Create",
                description: "Add new members to the organization.",
              },
              {
                uuid: "m3b4c5d6-e7f8-4g9h-0i1j-2k3l4m5n6o7p",
                name: "Members Read",
                description: "View all member profiles and roles.",
              },
              {
                uuid: "n4c5d6e7-f8g9-4h0i-1j2k-3l4m5n6o7p8q",
                name: "Members Update",
                description: "Update member information and roles.",
              },
              {
                uuid: "o5d6e7f8-g9h0-4i1j-2k3l-4m5n6o7p8q9r",
                name: "Members Delete",
                description: "Remove members from the organization.",
              },
              {
                uuid: "p6e7f8g9-h0i1-4j2k-3l4m-5n6o7p8q9r0s",
                name: "Vehicle Models Create",
                description: "Create new vehicle models.",
              },
              {
                uuid: "q7f8g9h0-i1j2-4k3l-4m5n-6o7p8q9r0s1t",
                name: "Vehicle Models Read",
                description: "View vehicle model details and specifications.",
              },
              {
                uuid: "r8g9h0i1-j2k3-4l4m-5n6o-7p8q9r0s1t2u",
                name: "Vehicle Models Update",
                description: "Update vehicle model information.",
              },
              {
                uuid: "s9h0i1j2-k3l4-4m5n-6o7p-8q9r0s1t2u3v",
                name: "Vehicle Models Delete",
                description: "Delete vehicle models from the catalog.",
              },
            ],
            assignedCount: 1,
            status: eRoleStatusModel.active,
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
        throw new Error(await response.text());
      }

      const result: tSuccessModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function readMany(
    filter: tRoleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tRoleModel>> {
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
                {
                  uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
                  name: "Partner Read",
                  description: "Read partner information and details.",
                },
                {
                  uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
                  name: "Partner Update",
                  description: "Update partner information and settings.",
                },
                {
                  uuid: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
                  name: "Partner Delete",
                  description: "Delete partner accounts and associated data.",
                },
                {
                  uuid: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8g",
                  name: "Roles Create",
                  description: "Create new roles within the organization.",
                },
                {
                  uuid: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8g9h",
                  name: "Roles Read",
                  description: "View all roles and their permissions.",
                },
                {
                  uuid: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8g9h0i",
                  name: "Roles Update",
                  description: "Update role permissions and settings.",
                },
                {
                  uuid: "g7b8c9d0-e1f2-4a3b-4c5d-6e7f8g9h0i1j",
                  name: "Roles Delete",
                  description: "Delete existing roles from the system.",
                },
                {
                  uuid: "h8c9d0e1-f2a3-4b4c-5d6e-7f8g9h0i1j2k",
                  name: "Branches Create",
                  description: "Create new branches or locations.",
                },
                {
                  uuid: "i9d0e1f2-a3b4-4c5d-6e7f-8g9h0i1j2k3l",
                  name: "Branches Read",
                  description: "View all branches and their details.",
                },
                {
                  uuid: "j0e1f2a3-b4c5-4d6e-7f8g-9h0i1j2k3l4m",
                  name: "Branches Update",
                  description: "Update branch information and settings.",
                },
                {
                  uuid: "k1f2a3b4-c5d6-4e7f-8g9h-0i1j2k3l4m5n",
                  name: "Branches Delete",
                  description: "Delete branches from the system.",
                },
                {
                  uuid: "l2a3b4c5-d6e7-4f8g-9h0i-1j2k3l4m5n6o",
                  name: "Members Create",
                  description: "Add new members to the organization.",
                },
                {
                  uuid: "m3b4c5d6-e7f8-4g9h-0i1j-2k3l4m5n6o7p",
                  name: "Members Read",
                  description: "View all member profiles and roles.",
                },
                {
                  uuid: "n4c5d6e7-f8g9-4h0i-1j2k-3l4m5n6o7p8q",
                  name: "Members Update",
                  description: "Update member information and roles.",
                },
                {
                  uuid: "o5d6e7f8-g9h0-4i1j-2k3l-4m5n6o7p8q9r",
                  name: "Members Delete",
                  description: "Remove members from the organization.",
                },
                {
                  uuid: "p6e7f8g9-h0i1-4j2k-3l4m-5n6o7p8q9r0s",
                  name: "Vehicle Models Create",
                  description: "Create new vehicle models.",
                },
                {
                  uuid: "q7f8g9h0-i1j2-4k3l-4m5n-6o7p8q9r0s1t",
                  name: "Vehicle Models Read",
                  description: "View vehicle model details and specifications.",
                },
                {
                  uuid: "r8g9h0i1-j2k3-4l4m-5n6o-7p8q9r0s1t2u",
                  name: "Vehicle Models Update",
                  description: "Update vehicle model information.",
                },
                {
                  uuid: "s9h0i1j2-k3l4-4m5n-6o7p-8q9r0s1t2u3v",
                  name: "Vehicle Models Delete",
                  description: "Delete vehicle models from the catalog.",
                },
              ],
              assignedCount: 1,
              status: eRoleStatusModel.active,
              createdAt: "2024-02-10T09:15:00Z",
              updatedAt: "2024-10-05T11:40:22Z",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
              permissions: [
                {
                  uuid: "i9d0e1f2-a3b4-4c5d-6e7f-8g9h0i1j2k3l",
                  name: "Branches Read",
                  description: "View all branches and their details.",
                },
                {
                  uuid: "m3b4c5d6-e7f8-4g9h-0i1j-2k3l4m5n6o7p",
                  name: "Members Read",
                  description: "View all member profiles and roles.",
                },
                {
                  uuid: "n4c5d6e7-f8g9-4h0i-1j2k-3l4m5n6o7p8q",
                  name: "Members Update",
                  description: "Update member information and roles.",
                },
                {
                  uuid: "q7f8g9h0-i1j2-4k3l-4m5n-6o7p8q9r0s1t",
                  name: "Vehicle Models Read",
                  description: "View vehicle model details and specifications.",
                },
              ],
              assignedCount: 3,
              status: eRoleStatusModel.active,
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
        throw new Error(await response.text());
      }

      const result: tPaginationSuccessModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function _delete(uuid: tUuid): Promise<tResponseOneService<null>> {
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
        throw new Error(await response.text());
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  return {
    create,
    readOne,
    readMany,
    delete: _delete,
  };
}
