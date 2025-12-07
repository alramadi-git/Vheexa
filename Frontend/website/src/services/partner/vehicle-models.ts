import { tUuid, zUuid } from "@/validations/uuid";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { tVehicleModelModel } from "@/models/partner/vehicle-model";

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

class ClsVehicleModelService extends ClsAbstractService {
  public constructor() {
    super("/partner/vehicle-models");
  }

  private async _getOneAsync(
    uuid: tUuid,
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
    uuid: tUuid,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return this.catcher<tSuccessOneService<tVehicleModelModel>>(
      async () => await this._getOneAsync(uuid),
    );
  }

  private async _getManyAsync(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tSuccessManyService<tVehicleModelModel>> {
    const parsedFilter = zVehicleModelFilter.parse(filter);
    const parsedPagination = zPagination.parse(pagination);

    const clsSearchParams = new URLSearchParams();

    if (parsedFilter.search !== undefined) {
      clsSearchParams.set("vehicle-model.search", parsedFilter.search);
    }

    parsedFilter.modelYears.forEach((modelYear) =>
      clsSearchParams.append("vehicle-model.model-years", modelYear.toString()),
    );

    if (parsedFilter.capacity.min !== undefined) {
      clsSearchParams.set(
        "vehicle-model.capacity.min",
        parsedFilter.capacity.min.toString(),
      );
    }
    if (parsedFilter.capacity.max !== undefined) {
      clsSearchParams.set(
        "vehicle-model.capacity.max",
        parsedFilter.capacity.max.toString(),
      );
    }

    parsedFilter.transmissions.forEach((transmissions) =>
      clsSearchParams.append(
        "vehicle-model.transmissions",
        transmissions.toString(),
      ),
    );

    parsedFilter.fuels.forEach((fuel) =>
      clsSearchParams.append("vehicle-model.fuels", fuel.toString()),
    );

    parsedFilter.colors.forEach((color) =>
      clsSearchParams.append("vehicle-model.colors", color),
    );

    if (parsedFilter.price.min !== undefined) {
      clsSearchParams.set(
        "vehicle-model.price.min",
        parsedFilter.price.min.toString(),
      );
    }
    if (parsedFilter.price.max !== undefined) {
      clsSearchParams.set(
        "vehicle-model.price.max",
        parsedFilter.price.max.toString(),
      );
    }

    if (parsedFilter.discount.min !== undefined) {
      clsSearchParams.set(
        "vehicle-model.discount.min",
        parsedFilter.discount.min.toString(),
      );
    }
    if (parsedFilter.discount.max !== undefined) {
      clsSearchParams.set(
        "vehicle-model.discount.max",
        parsedFilter.discount.max.toString(),
      );
    }

    parsedFilter.statuses.forEach((status) =>
      clsSearchParams.append("vehicle-model.statuses", status.toString()),
    );

    if (parsedPagination.page !== undefined) {
      clsSearchParams.set("pagination.page", parsedPagination.page.toString());
    }
    if (parsedPagination.pageSize !== undefined) {
      clsSearchParams.set(
        "pagination.page-size",
        parsedPagination.pageSize.toString(),
      );
    }

    const searchParamsString = clsSearchParams.toString();
    const data = await fetch(
      `${this._url}${searchParamsString.length === 0 ? "" : `?${searchParamsString}`}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!data.ok) {
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
  public async getManyAsync(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return this.catcher<tSuccessManyService<tVehicleModelModel>>(
      async () => await this._getManyAsync(filter, pagination),
    );
  }
}

export { ClsVehicleModelService };
