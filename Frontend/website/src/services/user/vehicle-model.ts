import {
  tVehicleFilter,
  zVehicleFilter,
} from "@/validations/user/vehicles/vehicle-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { tVehicleModelModel } from "@/models/user/vehicle-model";

import { tSuccessManyModel, tSuccessOneModel } from "@/models/success";
import { tFailedModel } from "@/models/failed";

import {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
  ClsErrorService,
  ClsAbstractService,
} from "@/services/service";
import { zUuid } from "@/validations/uuid";

class ClsVehicleModelService extends ClsAbstractService {
  public constructor() {
    super("/user/vehicles");
  }

  private async _getOneAsync(
    uuid: string,
  ): Promise<tSuccessOneService<tVehicleModelModel>> {
    const parsedUuid = zUuid.parse(uuid);

    const data = await fetch(`${this._url}/${parsedUuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!data.ok) {
      const dataBody: tFailedModel = await data.json();

      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessOneModel<tVehicleModelModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
    };
  }
  public async getOneAsync(
    uuid: string,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return await this.catcher<tSuccessOneService<tVehicleModelModel>>(
      async () => await this._getOneAsync(uuid),
    );
  }

  private async _getManyAsync(
    filter: tVehicleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    const parsedFilter = zVehicleFilter.parse(filter);
    const parsedPagination = zPagination.parse(pagination);

    const queryArray: string[] = [];

    if (parsedFilter.search !== "")
      queryArray.push(`search=${parsedFilter.search}`);
    if (parsedFilter.transmission !== "")
      queryArray.push(`transmission=${parsedFilter.transmission}`);
    if (parsedFilter.fuel !== "") queryArray.push(`fuel=${parsedFilter.fuel}`);

    if (parsedFilter.minCapacity !== 0)
      queryArray.push(`min-capacity=${parsedFilter.minCapacity}`);
    if (parsedFilter.maxCapacity !== 0)
      queryArray.push(`max-capacity=${parsedFilter.maxCapacity}`);

    if (parsedFilter.minPrice !== 0)
      queryArray.push(`min-price=${parsedFilter.minPrice}`);
    if (parsedFilter.maxPrice !== 0)
      queryArray.push(`max-price=${parsedFilter.maxPrice}`);

    if (parsedFilter.hasDiscount !== false)
      queryArray.push(`has-discount=${parsedFilter.hasDiscount}`);

    queryArray.push(`page=${parsedPagination.page}`);
    queryArray.push(`page-size=${parsedPagination.pageSize}`);

    const queryString = queryArray.join("&");
    const data = await fetch(
      `${this._url}${queryString.length === 0 ? "" : `?${queryString}`}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (data.ok === false) {
      const dataBody: tFailedModel = await data.json();

      throw new ClsErrorService(
        data.status,
        data.statusText,
        dataBody.message,
        dataBody.issues,
      );
    }

    const dataBody: tSuccessManyModel<tVehicleModelModel> = await data.json();
    return {
      isSuccess: true,
      statusCode: data.status,
      statusText: data.statusText,
      data: dataBody.data,
      pagination: dataBody.pagination,
    };
  }
  public async getMany(
    filters: tVehicleFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return await this.catcher<tSuccessManyService<tVehicleModelModel>>(
      async () => await this._getManyAsync(filters, pagination),
    );
  }
}

export { ClsVehicleModelService };
