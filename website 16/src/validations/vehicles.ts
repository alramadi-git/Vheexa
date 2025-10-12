import { z } from "zod";
import { zPagination } from "./pagination";

enum SORTING_BY {
  SEARCH = "NAME",
  TRANSMISSION = "TRANSMISSION",
  CAPACITY = "CAPACITY",
  FUEL = "FUEL",
  PRICE = "PRICE",
}
const zSORTING_BY = z.enum(SORTING_BY).default(SORTING_BY.SEARCH);

enum SORTING_DIRECTION {
  ASC = "ASC",
  DESC = "DESC",
}
const zSORTING_DIRECTION = z
  .enum(SORTING_DIRECTION)
  .default(SORTING_DIRECTION.ASC);

const zSorting = z
  .object({
    By: zSORTING_BY,
    Direction: zSORTING_DIRECTION,
  })
  .strict();
type TSorting = z.infer<typeof zSorting>;

const zVehicles = z
  .object({
    Search: z.string().optional(),
    Transmission: z.string().optional(),
    MinCapacity: z.number().optional(),
    MaxCapacity: z.number().optional(),
    Fuel: z.string().optional(),
    MinPrice: z.number().optional(),
    MaxPrice: z.number().optional(),
    HasDiscount: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.MinCapacity !== undefined && data.MaxCapacity !== undefined)
        return data.MinCapacity <= data.MaxCapacity;
      return true;
    },
    {
      path: ["MinCapacity"],
      message: "Min capacity must be Less than Max capacity",
    },
  )
  .refine(
    (data) => {
      if (data.MinPrice !== undefined && data.MaxPrice !== undefined)
        return data.MinPrice <= data.MaxPrice;
      return true;
    },
    {
      path: ["MinPrice"],
      message: "Min price must be Less than Max price",
    },
  )
  .strict();
type TVehicles = z.infer<typeof zVehicles>;

const zVehiclesFilter = z
  .object({
    Vehicles: zVehicles,
    // Sorting: z.nullable(zSorting),
    // Pagination: zPagination.optional().default({ Page: 1, PageSize: 10 }),
  })
  .strict();
type TVehiclesFilter = z.infer<typeof zVehiclesFilter>;

export type { TSorting, TVehicles, TVehiclesFilter };
export {
  SORTING_BY,
  SORTING_DIRECTION,
  zSORTING_BY,
  zSORTING_DIRECTION,
  zSorting,
  zVehicles,
  zVehiclesFilter,
};
