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
    branchCreate: tBranchCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedBranchCreate: tBranchCreate =
        zBranchCreate.parse(branchCreate);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/branches",
        JSON.stringify(parsedBranchCreate),
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
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/branches/${parsedUuid}`,
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
      const parsedFilter: tBranchFilter = zBranchFilter.parse(filter);
      const parsedPagination: tPagination = zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", parsedFilter.search);

      clsQuery.set("filter.status", parsedFilter.status?.toString());

      clsQuery.set("pagination.page", parsedPagination.page?.toString());
      clsQuery.set(
        "pagination.page-size",
        parsedPagination.pageSize?.toString(),
      );

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
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.delete(
        `/partner/dashboard/branches/${parsedUuid}`,
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
