import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tBranchCreate,
  tBranchFilter,
  zBranchCreate,
  zBranchFilter,
} from "@/validations/partner/branch";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tBranchModel } from "@/models/partner/branch";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsBranchService extends ClsAbstractService {
  public async addAsync(
    branch: tBranchCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      zBranchCreate.parse(branch);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/branches",
        JSON.stringify(branch),
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
  ): Promise<tResponseOneService<tBranchModel>> {
    return await this._catchAsync<tBranchModel>(async () => {
      zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/branches/${uuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tBranchModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getManyAsync(
    filter: tBranchFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tBranchModel>> {
    return await this._catchAsync<tBranchModel>(async () => {
      zBranchFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", filter.search);

      clsQuery.set("filter.status", filter.status?.toString());

      clsQuery.set("pagination.page", pagination.page?.toString());
      clsQuery.set("pagination.page-size", pagination.pageSize?.toString());

      const response: Response = await this._fetch.get(
        `/partner/dashboard/branches${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tBranchModel> = await response.json();
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
        `/partner/dashboard/branches/${uuid}`,
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

export { ClsBranchService };
