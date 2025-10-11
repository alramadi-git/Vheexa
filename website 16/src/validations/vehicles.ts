import { z } from "zod/v4";

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

type TSorting = {
  By: SORTING_BY;
  Direction: SORTING_DIRECTION;
};
const zSorting = z.object({
  By: zSORTING_BY,
  Direction: zSORTING_DIRECTION,
});

type TVehicles = {
  Search: string;
  PickupDate: Date;
  PickupLocation: string;
  DropoffDate: Date;
  DropoffLocation: string;
  Transmission: string;
  Capacity: number;
  Fuel: string;
  Price: number;
  Discount: boolean;
};

const zVehicles = z.object({});

type TFilter = {};
