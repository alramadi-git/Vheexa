import z from "zod/v4";

const zVehicleFilters = z
  .object({
    search: z.string(),
    transmission: z.string(),
    fuel: z.string(),
    minCapacity: z.coerce.number().min(0),
    maxCapacity: z.coerce.number().min(0),
    minPrice: z.coerce.number().min(0),
    maxPrice: z.coerce.number().min(0),
    hasDiscount: z.boolean(),
  })
  .refine(
    (vehicleFilters) => {
      if (vehicleFilters.minCapacity === 0 || vehicleFilters.maxCapacity === 0)
        return true;

      return vehicleFilters.minCapacity <= vehicleFilters.maxCapacity;
    },
    {
      path: ["minCapacity"],
      error: "min capacity should be less than or equal to max capacity",
    },
  )
  .refine(
    (vehicleFilters) => {
      if (vehicleFilters.minPrice === 0 || vehicleFilters.maxPrice === 0)
        return true;

      return vehicleFilters.minPrice <= vehicleFilters.maxPrice;
    },
    {
      path: ["minPrice"],
      error: "min price should be less than or equal to max price",
    },
  )
  .strict();
type tVehicleFilters = z.infer<typeof zVehicleFilters>;

export type { tVehicleFilters };
export { zVehicleFilters };
