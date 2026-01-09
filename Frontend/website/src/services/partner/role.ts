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
  public async addAsync(role: tRoleCreate): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      zRoleCreate.parse(role);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/roles",
        JSON.stringify(role),
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
      zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/roles/${uuid}`,
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
      zRoleFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.name", filter.name);

      clsQuery.set(
        "filter.permissions",
        filter.permissions.map((permission) => permission.toString()),
      );

      clsQuery.set("filter.status", filter.status?.toString());

      clsQuery.set("pagination.page", pagination.page?.toString());
      clsQuery.set("pagination.page-size", pagination.pageSize?.toString());

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
      zUuid.parse(uuid);

      const response: Response = await this._fetch.delete(
        `/partner/dashboard/roles/${uuid}`,
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
