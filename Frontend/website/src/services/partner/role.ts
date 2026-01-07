import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tRoleCreate,
  tRoleFilter,
  zRoleCreate,
  zRoleFilter,
} from "@/validations/partner/role";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tRoleModel } from "@/models/partner/role";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsRoleService extends ClsAbstractService {
  public async addAsync(
    roleCreate: tRoleCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedRoleCreate: tRoleCreate =
        zRoleCreate.parse(roleCreate);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/roles",
        JSON.stringify(parsedRoleCreate),
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  public async getOneAsync(
    uuid: tUuid,
  ): Promise<tResponseOneService<tRoleModel>> {
    return await this._catchAsync<tRoleModel>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/roles/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getManyAsync(
    filter: tRoleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tRoleModel>> {
    return await this._catchAsync<tRoleModel>(async () => {
      const parsedFilter: tRoleFilter = zRoleFilter.parse(filter);
      const parsedPagination: tPagination = zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.name", parsedFilter.name);

      clsQuery.set(
        "filter.permissions",
        parsedFilter.permissions.map((permission) => permission.toString()),
      );

      clsQuery.set(
        "filter.status",
        parsedFilter.status?.toString(),
      );

      clsQuery.set("pagination.page", parsedPagination.page?.toString());
      clsQuery.set(
        "pagination.page-size",
        parsedPagination.pageSize?.toString(),
      );

      const response: Response = await this._fetch.get(
        `/partner/dashboard/roles${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tRoleModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }
  public async deleteOneAsync(uuid: tUuid): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.delete(
        `/partner/dashboard/roles/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
}

export { ClsRoleService };
