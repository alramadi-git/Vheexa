import { tVehicleModel } from "@/models/user/vehicle";

import {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
  Service,
  ErrorService,
} from "../service";

import { tFailedModel } from "@/models/failed";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

import { tPagination, zPaginationFilter } from "@/validations/pagination";
import { tVehicleFilters, zVehicleFilters } from "@/validations/user/vehicle";

class VehicleService extends Service {
  public async GetOne(
    uuid: string,
  ): Promise<tResponseOneService<tVehicleModel>> {
    return await this.catcher<tSuccessOneService<tVehicleModel>>(async () => {
      const response = await fetch(`${this._APIUrl}/user/vehicles/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok === false) {
        const responseBody: tFailedModel = await response.json();
        throw new ErrorService(
          responseBody.statusCode,
          response.statusText,
          responseBody.message,
          responseBody.issues,
        );
      }

      const responseBody: tSuccessOneModel<tVehicleModel> =
        await response.json();
      return {
        isSuccess: true,
        statusCode: response.status,
        statusText: response.statusText,
        data: responseBody.data,
      };
    });
  }

  public async GetMany(
    filters: tVehicleFilters,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModel>> {
    return await this.catcher<tSuccessManyService<tVehicleModel>>(async () => {
      filters = zVehicleFilters.parse(filters);
      pagination = zPaginationFilter.parse(pagination);

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
      queryArray.push(`limit=${pagination.limit}`);

      let queryString = queryArray.join("&");
      queryString = queryString === "" ? "" : `?${queryString}`;

      const response = await fetch(
        `${this._APIUrl}/user/vehicles${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "force-cache",
          next: {
            revalidate: 3600,
          },
        },
      );

      if (response.ok === false) {
        const responseBody: tFailedModel = await response.json();
        throw new ErrorService(
          responseBody.statusCode,
          response.statusText,
          responseBody.message,
          responseBody.issues,
        );
      }

      const responseBody: tSuccessManyModel<tVehicleModel> =
        await response.json();

      return {
        isSuccess: true,
        statusCode: response.status,
        statusText: response.statusText,
        data: responseBody.data,
        pagination: responseBody.pagination,
      };
    });
  }
}

export type { tVehicleFilters as tVehicleFilters };
export { zVehicleFilters };

export type { tPagination };
export { zPaginationFilter as zPagination };

export { VehicleService };
