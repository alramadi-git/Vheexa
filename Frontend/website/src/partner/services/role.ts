"use client";

import { useQueryClient } from "@tanstack/react-query";

import useToken from "@/partner/hooks/tokens";
import useService from "@/services/use-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tRoleCreate,
  tRoleFilter,
  zRoleCreate,
  zRoleFilter,
} from "@/partner/validators/role";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { tRoleModel } from "@/partner/models/role";

import { tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedService } from "@/services/success";
import useAccount from "../hooks/account";

export default function useRoleService() {
  const queryClient = useQueryClient();

  const { accessToken, refreshTokens } = useAccount();
  const service = useService();

  async function create(
    role: tRoleCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zRoleCreate.parse(role);

      const response = await service.fetch.post(
        "/api/partner/dashboard/roles",
        JSON.stringify(role),
        accessToken,
      );

      if (!response.ok) {
        throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["roles"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({ queryKey: ["async-select", "roles"] }),
        queryClient.invalidateQueries({
          queryKey: ["async-multi-select", "roles"],
        }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      const response = await service.fetch.delete(
        `/api/partner/dashboard/roles/${uuid}`,
        accessToken,
      );

      if (!response.ok) {
        throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["roles"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({ queryKey: ["async-select", "roles"] }),
        queryClient.invalidateQueries({
          queryKey: ["async-multi-select", "roles"],
        }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function search(
    filter: tRoleFilter,
    pagination: tPagination,
  ): Promise<tPaginatedService<tRoleModel> | tErrorService> {
    return await service.catch<tRoleModel>(async () => {
      console.log("accessToken: ", accessToken);

      zRoleFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("Name", filter.name);

      clsQuery.set(
        "Permissions",
        filter.permissions.map((permission) => permission.toString()),
      );

      clsQuery.set("Status", filter.status?.toString());

      clsQuery.set("Page", pagination.page?.toString());
      clsQuery.set("PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/roles${clsQuery.toString()}`,
        accessToken,
      );

      if (!response.ok) {
        if (response.status === 401) await refreshTokens();

        throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tPaginatedModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    delete: _delete,
    search,
  };
}
