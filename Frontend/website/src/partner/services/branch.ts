"use client";

import { useQueryClient } from "@tanstack/react-query";

import useToken from "@/partner/hooks/tokens";
import useService from "@/services/use-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tBranchCreate,
  tBranchFilter,
  zBranchCreate,
  zBranchFilter,
} from "@/partner/validators/branch";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { tBranchModel } from "@/partner/models/branch";

import { tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedService } from "@/services/success";

export default function useBranchService() {
  const queryClient = useQueryClient();

  const { accessToken: token } = useToken();
  const service = useService();

  async function create(
    branch: tBranchCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zBranchCreate.parse(branch);

      const response = await service.fetch.post(
        "/api/partner/dashboard/branches",
        JSON.stringify(branch),
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }
      
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["branches"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({
          queryKey: ["async-select", "branches"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["async-multi-select", "branches"],
        }),
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
        `/api/partner/dashboard/branches/${uuid}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }
      
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["branches"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({
          queryKey: ["async-select", "branches"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["async-multi-select", "branches"],
        }),
      ]);

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function search(
    filter: tBranchFilter,
    pagination: tPagination,
  ): Promise<tPaginatedService<tBranchModel>> {
    return await service.catch<tBranchModel>(async () => {
      zBranchFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);

      clsQuery.set("Status", filter.status?.toString());

      clsQuery.set("Page", pagination.page?.toString());
      clsQuery.set("PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/branches${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tPaginatedModel<tBranchModel> = await response.json();
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
