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

import { eEnvironment } from "@/enums/environment";

import { eVehicleModelCategoryModel } from "../models/enums/vehicle-model";
import { eStatusModel } from "../models/enums/status";

import { tVehicleModelModel } from "@/partner/models/vehicle-model";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tPaginatedModel } from "@/models/success";
import { tSuccessService, tPaginatedSuccessService } from "@/services/success";

export default function useVehicleModelService() {
  const { token } = useToken();
  const service = usePartnerService();

  async function create(
    vehicleModel: tVehicleModelCreate,
  ): Promise<tSuccessService<null> | tErrorService> {
    return await service.catch<null>(async () => {
      zVehicleModelCreate.parse(vehicleModel);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

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

      formData.append("marketLaunch", vehicleModel.marketLaunch.toISOString());
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

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: null,
        };
      }

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
  ): Promise<tPaginatedSuccessService<tVehicleModelModel> | tErrorService> {
    return await service.catch<tVehicleModelModel>(async () => {
      zVehicleModelFilter.parse(filter);
      zPagination.parse(pagination);

      if (process.env.NODE_ENV !== eEnvironment.development) {
        return {
          isSuccess: true,
          data: [
            {
              uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2022_Tesla_Model_S_%28Facelift%29_Plaid.png/1200px-2022_Tesla_Model_S_%28Facelift%29_Plaid.png",
              gallery: [],
              name: "Model S",
              description:
                "Luxury electric sedan with long-range battery and autopilot.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Tesla",
              marketLaunch: "2022-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Automatic",
              fuel: "Electric",
              price: 180,
              discount: 30,
              tags: "electric, luxury, sedan, high-performance",
              status: eStatusModel.active,
              updatedAt: "2025-03-10T08:45:00Z",
              createdAt: "2025-01-15T12:00:00Z",
            },
            {
              uuid: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2022_Honda_Civic_Sport_%28front%29.jpg/1200px-2022_Honda_Civic_Sport_%28front%29.jpg",
              gallery: [],
              name: "Civic LX",
              description:
                "Reliable compact car with excellent fuel economy and modern design.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Honda",
              marketLaunch: "2023-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Manual",
              fuel: "Petrol 95",
              price: 65,
              discount: 0,
              tags: "sedan, compact, fuel-efficient, reliable",
              status: eStatusModel.active,
              updatedAt: "2025-03-08T14:22:00Z",
              createdAt: "2025-01-10T09:15:00Z",
            },
            {
              uuid: "b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/2020_BMW_M3_Competition_%28G80%29.jpg/1200px-2020_BMW_M3_Competition_%28G80%29.jpg",
              gallery: [],
              name: "M3 Competition",
              description:
                "High-performance luxury sports sedan with rear-wheel drive dynamics.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "BMW",
              marketLaunch: "2025-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Dual Clutch",
              fuel: "Petrol 98",
              price: 220,
              discount: 0,
              tags: "performance, luxury, sports, coupe",
              status: eStatusModel.active,
              updatedAt: "2025-03-07T11:30:00Z",
              createdAt: "2025-01-05T16:45:00Z",
            },
            {
              uuid: "c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Volkswagen_Golf_GTE_%28MK8%29_IMG_4409.jpg/1200px-Volkswagen_Golf_GTE_%28MK8%29_IMG_4409.jpg",
              gallery: [],
              name: "Golf GTI",
              description:
                "Iconic hot hatch with sport-tuned suspension and turbocharged engine.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Volkswagen",
              marketLaunch: "2021-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Semi-Automatic",
              fuel: "Petrol 95",
              price: 95,
              discount: 15,
              tags: "hot hatch, sport, compact, fun-to-drive",
              status: eStatusModel.active,
              updatedAt: "2025-03-06T10:10:00Z",
              createdAt: "2025-01-04T14:30:00Z",
            },
            {
              uuid: "d4e5f6g7-h8i9-0123-j4k5-l6m7n8o9p0q1",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
              gallery: [],
              name: "Camry SE",
              description:
                "Midsize family sedan known for reliability and comfort.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Toyota",
              marketLaunch: "2019-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "CVT",
              fuel: "Hybrid",
              price: 75,
              discount: 10,
              tags: "sedan, hybrid, reliable, family",
              status: eStatusModel.active,
              updatedAt: "2025-03-05T09:20:00Z",
              createdAt: "2025-01-03T11:00:00Z",
            },
            {
              uuid: "e5f6g7h8-i9j0-1234-k5l6-m7n8o9p0q1r2",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/2020_Subaru_Forester_%28SK%29_Sport_wagon_%282020-11-11%29_01.jpg/1200px-2020_Subaru_Forester_%28SK%29_Sport_wagon_%282020-11-11%29_01.jpg",
              gallery: [],
              name: "Forester Limited",
              description:
                "Compact SUV with standard all-wheel drive and spacious cabin.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Subaru",
              marketLaunch: "2020-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "CVT",
              fuel: "Petrol 91",
              price: 88,
              discount: 12,
              tags: "SUV, AWD, compact, outdoors",
              status: eStatusModel.active,
              updatedAt: "2025-03-04T13:15:00Z",
              createdAt: "2025-01-02T10:20:00Z",
            },
            {
              uuid: "f6g7h8i9-j0k1-2345-l6m7-n8o9p0q1r2s3",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/2021_Ford_F-150_XL_regular_cab.jpg/1200px-2021_Ford_F-150_XL_regular_cab.jpg",
              gallery: [],
              name: "F-150 XLT",
              description:
                "Full-size pickup truck with powerful engine options and towing capability.",
              category: eVehicleModelCategoryModel.truck,
              manufacturer: "Ford",
              marketLaunch: "2025-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Automatic",
              fuel: "Diesel",
              price: 130,
              discount: 0,
              tags: "truck, diesel, towing, full-size",
              status: eStatusModel.active,
              updatedAt: "2025-03-03T16:40:00Z",
              createdAt: "2025-01-01T08:30:00Z",
            },
            {
              uuid: "g7h8i9j0-k1l2-3456-m7n8-o9p0q1r2s3t4",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/2020_Chevrolet_Corvette_C8_1.jpg/1200px-2020_Chevrolet_Corvette_C8_1.jpg",
              gallery: [],
              name: "Corvette Stingray",
              description:
                "American mid-engine sports car with track-ready performance.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Chevrolet",
              marketLaunch: "2024-01-01T00:00:00.000Z",
              capacity: 2,
              transmission: "Dual Clutch",
              fuel: "Petrol 98",
              price: 290,
              discount: 30,
              tags: "sports car, performance, American, coupe",
              status: eStatusModel.active,
              updatedAt: "2025-03-02T12:05:00Z",
              createdAt: "2024-12-31T14:10:00Z",
            },
            {
              uuid: "h8i9j0k1-l2m3-4567-n8o9-p0q1r2s3t4u5",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Volvo_XC90_Inscription_T8_Twin_Engine_Plug-In_Hybrid_%28II%29_%E2%80%93_Frontansicht%2C_10._April_2021%2C_D%C3%BCsseldorf.jpg/1200px-Volvo_XC90_Inscription_T8_Twin_Engine_Plug-In_Hybrid_%28II%29_%E2%80%93_Frontansicht%2C_10._April_2021%2C_D%C3%BCsseldorf.jpg",
              gallery: [],
              name: "XC90 Inscription",
              description:
                "Luxury three-row SUV with Scandinavian design and safety focus.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Volvo",
              marketLaunch: "2025-01-01T00:00:00.000Z",
              capacity: 7,
              transmission: "Automatic",
              fuel: "Hybrid",
              price: 210,
              discount: 0,
              tags: "luxury, SUV, hybrid, family, safe",
              status: eStatusModel.active,
              updatedAt: "2025-03-01T10:50:00Z",
              createdAt: "2024-12-30T09:00:00Z",
            },
            {
              uuid: "i9j0k1l2-m3n4-5678-o9p0-q1r2s3t4u5v6",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2019_Dodge_Charger_SXT_%2826077584318%29.jpg/1200px-2019_Dodge_Charger_SXT_%2826077584318%29.jpg",
              gallery: [],
              name: "Charger R/T",
              description:
                "Classic American muscle car with powerful V8 engine and bold styling.",
              category: eVehicleModelCategoryModel.car,
              manufacturer: "Dodge",
              marketLaunch: "2010-01-01T00:00:00.000Z",
              capacity: 5,
              transmission: "Automatic",
              fuel: "Petrol 91",
              price: 145,
              discount: 15,
              tags: "muscle car, V8, American, sedan",
              status: eStatusModel.active,
              updatedAt: "2025-02-28T14:30:00Z",
              createdAt: "2024-12-29T13:20:00Z",
            },
          ],
          pagination: { page: 1, pageSize: 10, totalItems: 10 },
        };
      }

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
