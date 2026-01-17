"use client";

import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";
import { zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tOptionModel } from "@/models/partner/option";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsOptionsService extends ClsAbstractService {
  public async getRolesAsync(
    uuids: tUuid[],
  ): Promise<tResponseOneService<tOptionModel[]>> {
    return await this._catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.uuids", uuids);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/roles${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tOptionModel[]> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getRolesBeSearchAsync(
    search: string,
    page: number,
  ): Promise<tResponseManyService<tOptionModel>> {
    return await this._catch<tOptionModel>(async () => {
      search = search.trim();
      zPagination.shape.page.parse(page);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", search);

      clsQuery.set("pagination.page", page.toString());

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/roles/search${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }

  public async getBranchesAsync(
    uuids: tUuid[],
  ): Promise<tResponseOneService<tOptionModel[]>> {
    return await this._catch<tOptionModel[]>(async () => {
      zUuid.array().parse(uuids);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.uuids", uuids);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/branches${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tOptionModel[]> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getBranchesBySearchAsync(
    search: string,
    page: number,
  ): Promise<tResponseManyService<tOptionModel>> {
    return await this._catch<tOptionModel>(async () => {
      search = search.trim();
      zPagination.shape.page.parse(page);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", search);

      clsQuery.set("pagination.page", page.toString());

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/branches/search${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tOptionModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
        pagination: data.pagination,
      };
    });
  }
}

export { ClsOptionsService };
