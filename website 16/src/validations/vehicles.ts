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
    Search: z.nullable(z.string()),
    Transmission: z.nullable(z.string()),
    MinCapacity: z.nullable(z.number()),
    MaxCapacity: z.nullable(z.number()),
    Fuel: z.nullable(z.string()),
    MinPrice: z.nullable(z.number()),
    MaxPrice: z.nullable(z.number()),
    HasDiscount: z.nullable(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.MinCapacity != null && data.MaxCapacity != null)
        return data.MinCapacity < data.MaxCapacity;
      return false;
    },
    {
      path: ["MinCapacity"],
      message: "Min capacity must be Less than Max capacity",
    },
  )
  .refine(
    (data) => {
      if (data.MinPrice != null && data.MaxPrice != null)
        return data.MinPrice < data.MaxPrice;
      return false;
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
