import {
  tResponseOneService,
  tResponseManyService,
  ClsAbstractService,
} from "@/services/service";

import { tUuid, zUuid } from "@/validations/uuid";

import {
  tVehicleModelCreateForm,
  tVehicleModelCreate,
  tVehicleModelFilter,
  zVehicleModelCreateForm,
  zVehicleModelCreate,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

import { tPagination, zPagination } from "@/validations/pagination";

import { ClsImageKitService } from "@/services/imagekit/imagekit";
import { ClsQuery } from "@/libraries/query";

import { tImageKitAuthenticatorModel } from "@/models/imagekit/authenticator";
import { UploadResponse } from "@imagekit/next";

import { tVehicleModelModel } from "@/models/partner/vehicle-model";
import { tSuccessOneModel, tSuccessManyModel } from "@/models/success";

class ClsVehicleModelService extends ClsAbstractService {
  public async addAsync(
    vehicleModelCreateForm: tVehicleModelCreateForm,
  ): Promise<tResponseOneService<null>> {
    return await this._catchAsync<null>(async () => {
      const parsedVehicleModelCreateForm: tVehicleModelCreateForm =
        zVehicleModelCreateForm.parse(vehicleModelCreateForm);

      const clsImageKitService: ClsImageKitService = new ClsImageKitService();

      const credentials: tImageKitAuthenticatorModel =
        await clsImageKitService.authenticator();

      const now = Date.now().toString();
      const thumbnailRequest: Promise<UploadResponse> =
        clsImageKitService.upload({
          ...credentials,
          folder: `/vheexa/assets/vehicles`,
          file: parsedVehicleModelCreateForm.thumbnail,
          fileName: `thumbnail-${now}`,
        });

      const imagesRequest: Promise<UploadResponse>[] =
        parsedVehicleModelCreateForm.gallery.map((image) =>
          clsImageKitService.upload({
            ...credentials,
            folder: `/vheexa/assets/vehicles`,
            file: image,
            fileName: `gallery-${now}`,
          }),
        );

      const [
        thumbnailResult,
        ...imagesResult
      ]: PromiseSettledResult<UploadResponse>[] = await Promise.allSettled([
        thumbnailRequest,
        ...imagesRequest,
      ]);

      if (thumbnailResult.status === "rejected") {
        throw new Error(
          `Failed to upload thumbnail: ${thumbnailResult.reason instanceof Error ? thumbnailResult.reason.message : String(thumbnailResult.reason)}`,
        );
      }

      const rejectedImages = imagesResult.filter(
        (imageResult) => imageResult.status === "rejected",
      );
      if (rejectedImages.length > 0) {
        const errorText = rejectedImages
          .map((rejectedImage) =>
            rejectedImage.reason instanceof Error
              ? rejectedImage.reason.message
              : String(rejectedImage.reason),
          )
          .join(", ");

        throw new Error(`Failed to upload some images: ${errorText}`);
      }

      const thumbnailUrl: string = thumbnailResult.value.url ?? "";
      const imagesUrls: string[] = (
        imagesResult as PromiseFulfilledResult<UploadResponse>[]
      ).map((imageResult) => imageResult.value.url ?? "");

      const vehicleModelCreate: tVehicleModelCreate = {
        thumbnail: thumbnailUrl,
        gallery: imagesUrls,
        name: vehicleModelCreateForm.name,
        description: vehicleModelCreateForm.description,
        category: vehicleModelCreateForm.category,
        manufacturer: vehicleModelCreateForm.manufacturer,
        marketLaunch: vehicleModelCreateForm.marketLaunch,
        capacity: vehicleModelCreateForm.capacity,
        transmission: vehicleModelCreateForm.transmission,
        fuel: vehicleModelCreateForm.fuel,
        colors: vehicleModelCreateForm.colors,
        price: vehicleModelCreateForm.price,
        discount: vehicleModelCreateForm.discount,
        tags: vehicleModelCreateForm.tags,
        status: vehicleModelCreateForm.status,
      };
      const parsedVehicleModelCreate: tVehicleModelCreate =
        zVehicleModelCreate.parse(vehicleModelCreate);

      const response: Response = await this._fetch.post(
        "/partner/dashboard/vehicle-models",
        parsedVehicleModelCreate,
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
