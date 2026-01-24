"use client";

import useToken from "@/hooks/partner/token";
import useService from "../hook";

import { ClsQuery } from "@/libraries/query";

import { tUuid, zUuid } from "@/validations/uuid";
import { zPagination } from "@/validations/pagination";

import { eEnvironment } from "@/enums/environment";

import { tOptionModel } from "@/models/partner/option";

import { tSuccessModel, tPaginationSuccessModel } from "@/models/success";
import { tResponseOneService, tResponseManyService } from "@/services/service";

export default function useOptionsService() {
  const { token } = useToken();
  const service = useService();

  async function readRolesByUuid(
    uuids: tUuid[],
  ): Promise<tResponseOneService<tOptionModel[]>> {
    return await service.catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              name: "Owner",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
            },
          ].filter((role) => uuids.some((uuid) => uuid === role.uuid)),
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("filter.uuids", uuids);

      const response = await service.fetch.get(
        `/partner/dashboard/options/roles/uuids${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tSuccessModel<tOptionModel[]> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  async function readRoles(
    search: string,
    page: number,
  ): Promise<tResponseManyService<tOptionModel>> {
    return await service.catch<tOptionModel>(async () => {
      zPagination.shape.page.parse(page);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
              name: "Owner",
            },
            {
              uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
              name: "Manager",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 2 },
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Filter.Search", search);

      clsQuery.set("Pagination.Page", page.toString());

      const response = await service.fetch.get(
        `/partner/dashboard/options/roles${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tPaginationSuccessModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }

  async function readBranchesByUuid(
    uuids: tUuid[],
  ): Promise<tResponseOneService<tOptionModel[]>> {
    return await service.catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              name: "New York Headquarters",
            },
            {
              uuid: "550e8400-e29b-41d4-a716-446655440000",
              name: "Austin Downtown Branch",
            },
            {
              uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              name: "Los Angeles West Branch",
            },
            {
              uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
              name: "Chicago Lakeside Hub",
            },
            {
              uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
              name: "Miami Beach Office",
            },
            {
              uuid: "123e4567-e89b-12d3-a456-426614174000",
              name: "Seattle Downtown Center",
            },
            {
              uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
              name: "Denver Mountain Hub",
            },
          ].filter((role) => uuids.some((uuid) => uuid === role.uuid)),
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("filter.uuids", uuids);

      const response = await service.fetch.get(
        `/partner/dashboard/options/branches/uuids${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tSuccessModel<tOptionModel[]> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }

  async function readBranches(
    search: string,
    page: number,
  ): Promise<tResponseManyService<tOptionModel>> {
    return await service.catch<tOptionModel>(async () => {
      zPagination.shape.page.parse(page);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              name: "New York Headquarters",
            },
            {
              uuid: "550e8400-e29b-41d4-a716-446655440000",
              name: "Austin Downtown Branch",
            },
            {
              uuid: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              name: "Los Angeles West Branch",
            },
            {
              uuid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
              name: "Chicago Lakeside Hub",
            },
            {
              uuid: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
              name: "Miami Beach Office",
            },
            {
              uuid: "123e4567-e89b-12d3-a456-426614174000",
              name: "Seattle Downtown Center",
            },
            {
              uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
              name: "Denver Mountain Hub",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 2 },
        };
      }

      const clsQuery = new ClsQuery();

      clsQuery.set("Filter.Search", search);

      clsQuery.set("Pagination.Page", page.toString());

      const response = await service.fetch.get(
        `/partner/dashboard/options/branches${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: tPaginationSuccessModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }

  return {
    readRolesByUuid,
    readRoles,
    readBranchesByUuid,
    readBranches,
  };
}
