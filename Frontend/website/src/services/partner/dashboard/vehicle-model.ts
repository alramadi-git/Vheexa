import { tUuid, zUuid } from "@/validations/uuid";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model-filter";
import { tPagination, zPagination } from "@/validations/pagination";

import { tVehicleModelCreate } from "@/validations/partner/vehicle-model-create";
import { tVehicleModelModel } from "@/models/partner/vehicle-model";
import { tVehicleModelUpdate } from "@/validations/partner/vehicle-model-update";

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

import { ClsQuery } from "@/libraries/query";
import { clsFetch } from "@/consts/partner/fetch";

class ClsVehicleModelService extends ClsAbstractService {
  public async addOneAsync(vehicleModel: tVehicleModelCreate) {
    return this.catcher<tSuccessOneService<null>>(async () => {
      const data = await clsFetch.post(
        "/dashboard/vehicle-models",
        vehicleModel,
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

      const dataBody: tSuccessOneModel<null> = await data.json();
      return {
        isSuccess: true,
        statusCode: data.status,
        statusText: data.statusText,
        data: dataBody.data,
      };
    });
  }
  public async getOneAsync(
    uuid: tUuid,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return this.catcher<tSuccessOneService<tVehicleModelModel>>(async () => {
      const parsedUuid = zUuid.parse(uuid);

      const data = await clsFetch.get(
        `/dashboard/vehicle-models/${parsedUuid}`,
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

      const dataBody: tSuccessOneModel<tVehicleModelModel> = await data.json();
      return {
        isSuccess: true,
        statusCode: data.status,
        statusText: data.statusText,
        data: dataBody.data,
      };
    });
  }
  public async getManyAsync(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return this.catcher<tSuccessManyService<tVehicleModelModel>>(async () => {
      const parsedFilter = zVehicleModelFilter.parse(filter);
      const parsedPagination = zPagination.parse(pagination);

      const clsQuery = new ClsQuery();

      clsQuery.set("vehicle-model-filter.search", parsedFilter.search);

      clsQuery.setArray(
        "vehicle-model-filter.model-years",
        parsedFilter.modelYears.map((modelYear) => modelYear.toString()),
      );

      clsQuery.set(
        "vehicle-model-filter.capacity.min",
        parsedFilter.capacity.min?.toString(),
      );
      clsQuery.set(
        "vehicle-model-filter.capacity.max",
        parsedFilter.capacity.max?.toString(),
      );

      clsQuery.setArray(
        "vehicle-model-filter.transmissions",
        parsedFilter.transmissions.map((transmission) =>
          transmission.toString(),
        ),
      );

      clsQuery.setArray(
        "vehicle-model-filter.fuels",
        parsedFilter.fuels.map((fuel) => fuel.toString()),
      );

      clsQuery.set(
        "vehicle-model-filter.price.min",
        parsedFilter.price.min?.toString(),
      );
      clsQuery.set(
        "vehicle-model-filter.price.max",
        parsedFilter.price.max?.toString(),
      );

      clsQuery.set(
        "vehicle-model-filter.discount.min",
        parsedFilter.discount.min?.toString(),
      );
      clsQuery.set(
        "vehicle-model-filter.discount.max",
        parsedFilter.discount.max?.toString(),
      );

      clsQuery.setArray(
        "vehicle-model-filter.statuses",
        parsedFilter.statuses.map((status) => status.toString()),
      );

      clsQuery.set("pagination.page", parsedPagination.page?.toString());
      clsQuery.set(
        "pagination.page-size",
        parsedPagination.pageSize?.toString(),
      );

      const data = await clsFetch.get(
        `/dashboard/vehicle-models${clsQuery.toString()}`,
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
    });
  }
  public async updateOneAsync(uuid: tUuid, vehicleModel: tVehicleModelUpdate) {
    return this.catcher<tSuccessOneService<null>>(async () => {
      const data = await clsFetch.patch(
        `/dashboard/vehicle-models/${uuid}`,
        vehicleModel,
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

      const dataBody: tSuccessOneModel<null> = await data.json();
      return {
        isSuccess: true,
        statusCode: data.status,
        statusText: data.statusText,
        data: dataBody.data,
      };
    });
  }
}

export { ClsVehicleModelService };
