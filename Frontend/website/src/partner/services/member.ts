"use client";

import { useQueryClient } from "@tanstack/react-query";

import useToken from "@/partner/hooks/tokens";
import useService from "@/services/use";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tMemberCreate,
  tMemberFilter,
  zMemberCreate,
  zMemberFilter,
} from "@/partner/validators/member";

import {
  tOptionFilter,
  tOptionPagination,
  zOptionFilter,
  zOptionPagination,
} from "@/partner/validators/option";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { tMemberModel } from "@/partner/models/member";
import { tOptionModel } from "@/partner/models/option";

import { tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedService } from "@/services/success";

export default function useMemberService() {
  const queryClient = useQueryClient();

  const { accessToken: token } = useToken();
  const service = useService();

  async function create(
    member: tMemberCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.globalCatch<null>(async () => {
      zMemberCreate.parse(member);

      const formData = new FormData();

      if (member.avatar) {
        formData.append("avatar", member.avatar);
      }

      formData.append("roleUuid", member.roleUuid);
      formData.append("branchUuid", member.branchUuid);
      formData.append("username", member.username);
      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("status", member.status.toString());

      const response = await service.fetch.post(
        "/api/partner/dashboard/members",
        formData,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["members"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({ queryKey: ["roles"] }),
        queryClient.invalidateQueries({ queryKey: ["branches"] }),
      ]);

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function readRoles(
    uuids: tUuid[],
  ): Promise<tSuccessService<tOptionModel[]> | tErrorService> {
    return await service.globalCatch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      const clsQuery = new ClsQuery();

      clsQuery.set("Uuids", uuids);

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/roles${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tOptionModel[] = await response.json();
      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function readBranches(
    uuids: tUuid[],
  ): Promise<tSuccessService<tOptionModel[]> | tErrorService> {
    return await service.globalCatch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      const clsQuery = new ClsQuery();

      clsQuery.set("Uuids", uuids);

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/branches${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tOptionModel[] = await response.json();
      return {
        isSuccess: true,
        data: result,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.globalCatch<null>(async () => {
      zUuid.parse(uuid);

      const response = await service.fetch.delete(
        `/api/partner/dashboard/members/${uuid}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["members"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] }),
        queryClient.invalidateQueries({ queryKey: ["roles"] }),
        queryClient.invalidateQueries({ queryKey: ["branches"] }),
      ]);

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function searchRoles(
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedService<tOptionModel> | tErrorService> {
    return await service.globalCatch<tOptionModel>(async () => {
      zOptionFilter.parse(filter);
      zOptionPagination.parse(pagination);

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);
      clsQuery.set("Page", pagination.page?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/roles/search${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tPaginatedModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function searchBranches(
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedService<tOptionModel> | tErrorService> {
    return await service.globalCatch<tOptionModel>(async () => {
      zOptionFilter.parse(filter);
      zOptionPagination.parse(pagination);

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);
      clsQuery.set("Page", pagination.page?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members/options/branches/search${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tPaginatedModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }
  async function search(
    filter: tMemberFilter,
    pagination: tPagination,
  ): Promise<tPaginatedService<tMemberModel> | tErrorService> {
    return await service.globalCatch<tMemberModel>(async () => {
      zMemberFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery = new ClsQuery();

      clsQuery.set("Search", filter.search);

      clsQuery.set("RoleUuids", filter.roleUuids);

      clsQuery.set("BranchUuids", filter.branchUuids);

      clsQuery.set("Status", filter.status?.toString());

      clsQuery.set("Page", pagination.page?.toString());
      clsQuery.set("PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/members${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
           throw new Error(
          response.status === 401 ? "Unauthorized" : await response.text(),
        );
      }

      const result: tPaginatedModel<tMemberModel> = await response.json();
      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    readRoles,
    readBranches,
    delete: _delete,
    search,
    searchRoles,
    searchBranches,
  };
}
