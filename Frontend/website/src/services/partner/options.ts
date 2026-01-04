import { tResponseManyService, ClsAbstractService } from "@/services/service";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tUndefinable } from "@/types/nullish";

import { tOptionModel } from "@/models/partner/option";
import { tSuccessManyModel } from "@/models/success";

class ClsOptionsService extends ClsAbstractService {
  public async getRolesAsync(
    search: string,
    page: tPagination["page"],
  ): Promise<tResponseManyService<tOptionModel>> {
    return await this._catchAsync<tOptionModel>(async () => {
      const parsedSearch: tUndefinable<string> = search?.trim();
      const parsedPage: tUndefinable<tPagination["page"]> =
        zPagination.shape.page.parse(page);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", parsedSearch);

      clsQuery.set("pagination.page", parsedPage?.toString());

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/roles${clsQuery.toString()}`,
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
    search?: string,
    page?: tPagination["page"],
  ): Promise<tResponseManyService<tOptionModel>> {
    return await this._catchAsync<tOptionModel>(async () => {
      const parsedSearch: tUndefinable<string> = search?.trim();
      const parsedPage: tUndefinable<tPagination["page"]> =
        zPagination.shape.page.parse(page);

      const clsQuery: ClsQuery = new ClsQuery();

      clsQuery.set("filter.search", parsedSearch);

      clsQuery.set("pagination.page", parsedPage?.toString());

      const response: Response = await this._fetch.get(
        `/partner/dashboard/options/branches${clsQuery.toString()}`,
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
