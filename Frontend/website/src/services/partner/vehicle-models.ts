import { ClsQuery } from "@/libraries/query";

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

    const data = await this._fetch.get(parsedUuid);
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

    const clsQuery = new ClsQuery();

    clsQuery.set("vehicle-model.search", parsedFilter.search);

    clsQuery.setMany(
      "vehicle-model.model-years",
      parsedFilter.modelYears.map((modelYear) => modelYear.toString()),
    );

    clsQuery.set(
      "vehicle-model.capacity.min",
      parsedFilter.capacity.min?.toString(),
    );
    clsQuery.set(
      "vehicle-model.capacity.max",
      parsedFilter.capacity.max?.toString(),
    );

    clsQuery.setMany(
      "vehicle-model.transmissions",
      parsedFilter.transmissions.map((transmission) => transmission.toString()),
    );

    clsQuery.setMany(
      "vehicle-model.fuels",
      parsedFilter.fuels.map((fuel) => fuel.toString()),
    );

    clsQuery.set("vehicle-model.price.min", parsedFilter.price.min?.toString());
    clsQuery.set("vehicle-model.price.max", parsedFilter.price.max?.toString());

    clsQuery.set(
      "vehicle-model.discount.min",
      parsedFilter.discount.min?.toString(),
    );
    clsQuery.set(
      "vehicle-model.discount.max",
      parsedFilter.discount.max?.toString(),
    );

    clsQuery.setMany(
      "vehicle-model.statuses",
      parsedFilter.statuses.map((status) => status.toString()),
    );

    clsQuery.set("pagination.page", parsedPagination.page?.toString());
    clsQuery.set("pagination.page-size", parsedPagination.pageSize?.toString());

    const data = await this._fetch.get(clsQuery.toString());
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
