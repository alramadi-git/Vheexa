import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";
import {
  tPartnerRoleCreate,
  zPartnerRoleCreate,
} from "@/validations/partner/role-create";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tPartnerRoleModel } from "@/models/partner/partner-role";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import {
  tPartnerRoleFilter,
  zPartnerRoleFilter,
} from "@/validations/partner/role-filter";

class ClsRoleService extends ClsAbstractService {
  public async addAsync(
    roleCreate: tPartnerRoleCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedRoleCreate: tPartnerRoleCreate =
        zPartnerRoleCreate.parse(roleCreate);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/roles",
        parsedRoleCreate,
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
  ): Promise<tResponseOneService<tPartnerRoleModel>> {
    return await this._catchAsync<tPartnerRoleModel>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/roles/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tPartnerRoleModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getManyAsync(
    filter: tPartnerRoleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tPartnerRoleModel>> {
    return await this._catchAsync<tPartnerRoleModel>(async () => {
      const parsedFilter: tPartnerRoleFilter = zPartnerRoleFilter.parse(filter);
      const parsedPagination: tPagination = zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("partner-role-filter.name", parsedFilter.name);

      clsQuery.set(
        "partner-role-filter.permissions",
        parsedFilter.permissions.map((permission) => permission.toString()),
      );

      clsQuery.set(
        "partner-role-filter.status",
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

      const data: tSuccessManyModel<tPartnerRoleModel> = await response.json();
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
