import type {
  tSuccessManyModel,
  tSuccessOneModel,
} from "@/app/api/user/_models/response";
import type { tVehicle } from "@/app/api/user/_types/vehicle";

import z from "zod/v4";

const zVehicleFilters = z
  .object({
    search: z.string(),
    transmission: z.string(),
    fuel: z.string(),
    minCapacity: z.number().min(0),
    maxCapacity: z.number().min(0),
    minPrice: z.number().min(0),
    maxPrice: z.number().min(0),
    hasDiscount: z.boolean(),
  })
  .refine(
    (vehicleFilters) =>
      vehicleFilters.minCapacity <= vehicleFilters.maxCapacity,
  )
  .refine(
    (vehicleFilters) => vehicleFilters.minPrice <= vehicleFilters.maxPrice,
  )
  .strict();
type tVehicleFilters = z.infer<typeof zVehicleFilters>;

enum eLIMIT {
  _5 = 5,
  _10 = 10,
  _25 = 25,
  _50 = 50,
  _75 = 75,
  _100 = 100,
}

const zPagination = z
  .object({
    page: z.number().min(1),
    limit: z.enum(eLIMIT),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

class VehicleService {
  public static async GetOne(
    uuid: string,
  ): Promise<tSuccessOneModel<tVehicle>> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/vehicles/${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: tSuccessOneModel<tVehicle> = await response.json();
    return responseBody;
  }

  public static async GetMany(
    filters: tVehicleFilters,
    pagination: tPagination,
  ): Promise<tSuccessManyModel<tVehicle>> {
    const filtersResult = zVehicleFilters.safeParse(filters);
    if (filtersResult.success === false)
      throw new Error(filtersResult.error.message);

    const paginationResult = zPagination.safeParse(pagination);
    if (paginationResult.success === false)
      throw new Error(paginationResult.error.message);

    filters = filtersResult.data;
    pagination = paginationResult.data;

    const queryArray = [];
    if (filters.search) queryArray.push(`Search.Value=${filters.search}`);
    if (filters.transmission)
      queryArray.push(`Transmission.Value=${filters.transmission}`);
    if (filters.fuel) queryArray.push(`Fuel.Value=${filters.fuel}`);

    if (filters.minCapacity)
      queryArray.push(`MinCapacity.Value=${filters.minCapacity}`);
    if (filters.maxCapacity)
      queryArray.push(`MaxCapacity.Value=${filters.maxCapacity}`);

    if (filters.minPrice) queryArray.push(`MinPrice.Value=${filters.minPrice}`);
    if (filters.maxPrice) queryArray.push(`MaxPrice.Value=${filters.maxPrice}`);

    if (filters.hasDiscount)
      queryArray.push(`HasDiscount.Value=${filters.hasDiscount}`);

    queryArray.push(`Page=${pagination.page}`);
    queryArray.push(`Limit=${pagination.limit}`);

    let queryString = queryArray.join("&");
    queryString = queryString === "" ? "" : `?${queryString}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/vehicles${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: tSuccessManyModel<tVehicle> = await response.json();
    return responseBody;
  }
}

export type { tVehicleFilters };
export { zVehicleFilters };

export type { tPagination };
export { zPagination };

export { VehicleService };
