"use client";

import useToken from "@/hooks/partner/token";
import useService from "../helper";

import { ClsQuery } from "@/libraries/query";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tVehicleModelCreate,
  tVehicleModelFilter,
  zVehicleModelCreate,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

import { tPagination, zPagination } from "@/validations/pagination";

import { eEnvironment } from "@/enums/environment";

import { tVehicleModelModel } from "@/models/partner/vehicle-model";

import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";
import { tResponseOneService, tResponseManyService } from "@/services/service";

export default function useRoleService() {
  const { token } = useToken();
  const service = useService();

  async function create(
    vehicleModel: tVehicleModelCreate,
  ): Promise<tResponseOneService<null>> {
    return await service.catch<null>(async () => {
      zVehicleModelCreate.parse(vehicleModel);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

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

      vehicleModel.colors.forEach((color, colorIndex) => {
        formData.append(`colors[${colorIndex}].hexCode`, color.hexCode);
        formData.append(`colors[${colorIndex}].name`, color.name);

        color.tags.forEach((tag, tagIndex) =>
          formData.append(`colors[${colorIndex}].tags[${tagIndex}]`, tag),
        );
      });

      formData.append("price", vehicleModel.price.toString());
      formData.append("discount", vehicleModel.discount.toString());

      vehicleModel.tags.forEach((tag, index) =>
        formData.append(`tags[${index}]`, tag),
      );

      formData.append("status", vehicleModel.status.toString());

      const response = await service.fetch.post(
        "/partner/dashboard/vehicle-models",
        formData,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  async function readOne(
    uuid: tUuid,
  ): Promise<tResponseOneService<tVehicleModelModel>> {
    return await service.catch<tVehicleModelModel>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.get(
        `/partner/dashboard/vehicle-models/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tSuccessOneModel<tVehicleModelModel> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function readMany(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tResponseManyService<tVehicleModelModel>> {
    return await service.catch<tVehicleModelModel>(async () => {
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

      const response = await service.fetch.get(
        `/partner/dashboard/vehicle-models${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result: tSuccessManyModel<tVehicleModelModel> =
        await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  async function _delete(uuid: tUuid): Promise<tResponseOneService<null>> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      if (process.env.NODE_ENV === eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

      const response = await service.fetch.delete(
        `/partner/dashboard/vehicle-models/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  return {
    create,
    readOne,
    readMany,
    delete: _delete,
  };
}
