import {
  tVehicleFilter,
  zVehicleFilter,
} from "@/validations/user/vehicles/vehicle-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import { tSuccessManyModel, tSuccessOneModel } from "@/models/general/success";
import { tFailedModel } from "@/models/general/failed";

import {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";

class ClsVehicleService extends ClsAbstractService {
  public constructor() {
    super("/user/vehicles");
  }

  private async _getOneAsync(
    uuid: string,
  ): Promise<tSuccessOneService<tVehicleModelModel>> {
    const response = await fetch(`${this._url}/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok === false) {
      const responseBody: tFailedModel = await response.json();
      throw new ClsErrorService(
        response.status,
        response.statusText,
        responseBody.message,
        responseBody.issues,
      );
    }

    const responseBody: tSuccessOneModel<tVehicleModelModel> =
      await response.json();
    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
    };
  }
  public async getOneAsync(
    uuid: string,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return await this.catcher<tSuccessOneService<tVehicleModelModel>>(
      async () => await this._getOneAsync(uuid),
    );
  }

  public async getMany(
    filters: tVehicleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return await this.catcher<tSuccessManyService<tVehicleModelModel>>(
      async () => {
        filters = zVehicleFilter.parse(filters);
        pagination = zPagination.parse(pagination);

        const queryArray = [];
        if (filters.search !== "") queryArray.push(`search=${filters.search}`);
        if (filters.transmission !== "")
          queryArray.push(`transmission=${filters.transmission}`);
        if (filters.fuel !== "") queryArray.push(`fuel=${filters.fuel}`);

        if (filters.minCapacity !== 0)
          queryArray.push(`minCapacity=${filters.minCapacity}`);
        if (filters.maxCapacity !== 0)
          queryArray.push(`maxCapacity=${filters.maxCapacity}`);

        if (filters.minPrice !== 0)
          queryArray.push(`minPrice=${filters.minPrice}`);
        if (filters.maxPrice !== 0)
          queryArray.push(`maxPrice=${filters.maxPrice}`);

        if (filters.hasDiscount !== false)
          queryArray.push(`hasDiscount=${filters.hasDiscount}`);

        queryArray.push(`page=${pagination.page}`);
        queryArray.push(`limit=${pagination.pageSize}`);

        let queryString = queryArray.join("&");
        queryString = queryString.length === 0 ? "" : `?${queryString}`;

        const response = await fetch(`${this._url}${queryString}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok === false) {
          const responseBody: tFailedModel = await response.json();
          throw new ClsErrorService(
            response.status,
            response.statusText,
            responseBody.message,
            responseBody.issues,
          );
        }

        const responseBody: tSuccessManyModel<tVehicleModelModel> =
          await response.json();

        return {
          isSuccess: true,
          statusCode: response.status,
          statusText: response.statusText,
          data: responseBody.data,
          pagination: responseBody.pagination,
        };
      },
    );
  }
}

export type { tVehicleFilter as tVehicleFilters };
export { zVehicleFilter as zVehicleFilters };

export type { tPagination };
export { zPagination as zPagination };

export { ClsVehicleService };
