import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tVehicleModelCreate,
  tVehicleModelFilter,
  zVehicleModelCreate,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsQuery } from "@/libraries/query";

import { tVehicleModelModel } from "@/models/partner/vehicle-model";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsVehicleModelService extends ClsAbstractService {
  public async addAsync(
    vehicleModel: tVehicleModelCreate,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      zVehicleModelCreate.parse(vehicleModel);

      const formData = new FormData();
      formData.append("thumbnail", vehicleModel.thumbnail);
      vehicleModel.gallery.forEach((image, index) =>
        formData.append(`gallery[${index}]`, image),
      );

      formData.append("name", vehicleModel.name);
      formData.append("description", vehicleModel.description);

      formData.append("category", vehicleModel.category.toString());

      formData.append("marketLaunch", vehicleModel.marketLaunch.toISOString());
      formData.append("manufacturer", vehicleModel.manufacturer);

      formData.append("capacity", vehicleModel.capacity.toString());
      formData.append("transmission", vehicleModel.transmission);
      formData.append("fuel", vehicleModel.fuel);

      vehicleModel.colors.forEach((color, index) => {
        formData.append(`colors[${index}].hexCode`, color.hexCode);
        formData.append(`colors[${index}].name`, color.name);

        color.tags.forEach((tag, _index) =>
          formData.append(`colors[${index}].tags[${_index}]`, tag),
        );
      });

      formData.append("price", vehicleModel.price.toString());
      formData.append("discount", vehicleModel.discount.toString());

      vehicleModel.tags.forEach((tag, _index) =>
        formData.append(`tags[${_index}]`, tag),
      );

      formData.append("status", vehicleModel.status.toString());

      const response: Response = await this._fetch.post(
        "/partner/dashboard/vehicle-models",
        formData,
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
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return await this._catchAsync<tVehicleModelModel>(async () => {
      const parsedUuid: tUuid = zUuid.parse(uuid);

      const response: Response = await this._fetch.get(
        `/partner/dashboard/vehicle-models/${parsedUuid}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessOneModel<tVehicleModelModel> = await response.json();
      return {
        isSuccess: true,
        data: data.data,
      };
    });
  }
  public async getManyAsync(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return await this._catchAsync<tVehicleModelModel>(async () => {
      const parsedFilter: tVehicleModelFilter =
        zVehicleModelFilter.parse(filter);
      const parsedPagination: tPagination = zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();
      clsQuery.set("vehicle-model-filter.search", parsedFilter.search);

      clsQuery.set(
        "vehicle-model-filter.categories",
        parsedFilter.categories.map((category) => category.toString()),
      );

      clsQuery.set(
        "vehicle-model-filter.capacity.min",
        parsedFilter.capacity.min?.toString(),
      );
      clsQuery.set(
        "vehicle-model-filter.capacity.max",
        parsedFilter.capacity.max?.toString(),
      );

      clsQuery.set(
        "vehicle-model-filter.transmissions",
        parsedFilter.transmissions,
      );

      clsQuery.set("vehicle-model-filter.fuels", parsedFilter.fuels);

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

      clsQuery.set(
        "vehicle-model-filter.status",
        parsedFilter.status?.toString(),
      );

      clsQuery.set("pagination.page", parsedPagination.page?.toString());
      clsQuery.set(
        "pagination.page-size",
        parsedPagination.pageSize?.toString(),
      );

      const response: Response = await this._fetch.get(
        `/partner/dashboard/vehicle-models${clsQuery.toString()}`,
      );

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(errorText);
      }

      const data: tSuccessManyModel<tVehicleModelModel> = await response.json();
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
        `/partner/dashboard/vehicle-models/${parsedUuid}`,
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

export { ClsVehicleModelService };
