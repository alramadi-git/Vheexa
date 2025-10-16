import type {
  tResponseOneModel,
  tResponseManyModel,
} from "@/app/api/user/_models/response";
import type { tVehicle } from "@/app/api/user/_types/vehicle";

import z from "zod/v4";

const zVehicleFilters = z.object({
  search: z.string().optional(),
  transmission: z.string().optional(),
  fuel: z.string().optional(),
  minCapacity: z.number().optional(),
  maxCapacity: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  hasDiscount: z.boolean().optional(),
});
type tVehicleFilters = z.infer<typeof zVehicleFilters>;

class VehicleService {
  public static async GetOne(
    uuid: string,
  ): Promise<tResponseOneModel<tVehicle>> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/vehicles/${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody = await response.json();
    return responseBody;
  }

  public static async GetMany(
    query: tVehicleFilters,
  ): Promise<tResponseManyModel<tVehicle>> {
    const queryArray = [];

    if (query.search) queryArray.push(`vehicle.search=${query.search}`);
    if (query.transmission)
      queryArray.push(`vehicle.transmission=${query.transmission}`);
    if (query.fuel) queryArray.push(`vehicle.fuel=${query.fuel}`);

    if (query.minCapacity)
      queryArray.push(`vehicle.minCapacity=${query.minCapacity}`);
    if (query.maxCapacity)
      queryArray.push(`vehicle.maxCapacity=${query.maxCapacity}`);

    if (query.minPrice) queryArray.push(`vehicle.minPrice=${query.minPrice}`);
    if (query.maxPrice) queryArray.push(`vehicle.maxPrice=${query.maxPrice}`);

    if (query.hasDiscount)
      queryArray.push(`vehicle.hasDiscount=${query.hasDiscount}`);

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

    const responseBody: tResponseManyModel<tVehicle> = await response.json();
    return responseBody;
  }
}

export type { tVehicleFilters };
export { zVehicleFilters };

export { VehicleService };
