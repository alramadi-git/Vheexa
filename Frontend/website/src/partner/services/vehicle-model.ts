"use client";

import useToken from "@/partner/hooks/token";
import usePartnerService from "./use-partner-service";

import { tUuid, zUuid } from "@/validators/uuid";

import {
  tVehicleModelCreate,
  tVehicleModelFilter,
  zVehicleModelCreate,
  zVehicleModelFilter,
} from "@/partner/validators/vehicle-model";

import { tPagination, zPagination } from "@/validators/pagination";

import { ClsQuery } from "@/libraries/query";

import { tVehicleModelModel } from "@/partner/models/vehicle-model";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedService } from "@/services/success";

export default function useVehicleModelService() {
  const { token } = useToken();
  const service = usePartnerService();

  async function create(
    vehicleModel: tVehicleModelCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zVehicleModelCreate.parse(vehicleModel);

      const formData = new FormData();

      if (vehicleModel.thumbnail) {
        formData.append("thumbnail", vehicleModel.thumbnail);
      }

      vehicleModel.gallery.forEach((image, index) =>
        formData.append(`gallery[${index}]`, image),
      );

      formData.append("name", vehicleModel.name);
      formData.append("description", vehicleModel.description);

      formData.append("category", vehicleModel.category.toString());

      formData.append("marketLaunch", vehicleModel.marketLaunch.toISOString().split("T")[0]);
      formData.append("manufacturer", vehicleModel.manufacturer);

      formData.append("capacity", vehicleModel.capacity.toString());
      formData.append("transmission", vehicleModel.transmission);
      formData.append("fuel", vehicleModel.fuel);

      formData.append("price", vehicleModel.price.toString());
      formData.append("discount", vehicleModel.discount.toString());

      formData.append("tags", vehicleModel.tags);

      formData.append("status", vehicleModel.status.toString());

      const response = await service.fetch.post(
        "/api/partner/dashboard/vehicle-models",
        formData,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function _delete(
    uuid: tUuid,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zUuid.parse(uuid);

      const response = await service.fetch.delete(
        `/api/partner/dashboard/vehicle-models/${uuid}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
  async function search(
    filter: tVehicleModelFilter,
    pagination: tPagination,
  ): Promise<tPaginatedService<tVehicleModelModel> | tErrorService> {
    return await service.catch<tVehicleModelModel>(async () => {
      zVehicleModelFilter.parse(filter);
      zPagination.parse(pagination);

      const clsQuery: ClsQuery = new ClsQuery();
      clsQuery.set("Search", filter.search);

      clsQuery.set(
        "Categories",
        filter.categories.map((category) => category.toString()),
      );

      clsQuery.set("Capacity.Min", filter.capacity.min?.toString());
      clsQuery.set("Capacity.Max", filter.capacity.max?.toString());

      clsQuery.set("Price.Min", filter.price.min?.toString());
      clsQuery.set("Price.Max", filter.price.max?.toString());

      clsQuery.set("Discount.Min", filter.discount.min?.toString());
      clsQuery.set("Discount.Max", filter.discount.max?.toString());

      clsQuery.set("Status", filter.status?.toString());

      clsQuery.set("Page", pagination.page?.toString());
      clsQuery.set("PageSize", pagination.pageSize?.toString());

      const response = await service.fetch.get(
        `/api/partner/dashboard/vehicle-models${clsQuery.toString()}`,
        token,
      );

      if (!response.ok) {
        throw new ClsErrorService(await response.text(), response.status);
      }

      const result: tPaginatedModel<tVehicleModelModel> = await response.json();

      return {
        isSuccess: true,
        ...result,
      };
    });
  }

  return {
    create,
    delete: _delete,
    search,
  };
}
