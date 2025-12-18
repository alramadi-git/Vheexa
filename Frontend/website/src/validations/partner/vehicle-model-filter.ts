import z from "zod";

import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelFilter = z
  .object({
    search: z.optional(z.string().trim()),
    categories: z.array(z.enum(eVehicleModelCategoryModel, "Invalid category.")),
    capacity: z
      .object({
        min: z.optional(z.number().nonnegative("capacity cannot be negative.")),
        max: z.optional(z.number().nonnegative("capacity cannot be negative.")),
      })
      .refine(
        (value) => {
          if (value.min !== undefined && value.max !== undefined)
            return value.min <= value.max;
          return true;
        },
        {
          path: ["capacity"],
          error:
            "min capacity should be less than, equal to max capacity or leave it blank.",
        },
      ),
    transmissions: z.array(
      z.string().nonempty("transmission cannot be empty."),
    ),
    fuels: z.array(z.string().nonempty("fuel cannot be empty.")),
    colors: z.array(z.string().nonempty("color cannot be empty.")),
    price: z
      .object({
        min: z.optional(z.number().nonnegative("price cannot be negative.")),
        max: z.optional(z.number().nonnegative("price cannot be negative.")),
      })
      .refine(
        (value) => {
          if (value.min !== undefined && value.max !== undefined)
            return value.min <= value.max;
          return true;
        },
        {
          path: ["price"],
          error:
            "min price should be less than, equal to max price or leave it blank.",
        },
      ),
    discount: z
      .object({
        min: z.optional(z.number().nonnegative("discount cannot be negative.")),
        max: z.optional(z.number().nonnegative("discount cannot be negative.")),
      })
      .refine(
        (value) => {
          if (value.min !== undefined && value.max !== undefined)
            return value.min <= value.max;
          return true;
        },
        {
          path: ["discount"],
          error:
            "min discount should be less than, equal to max discount or leave it blank.",
        },
      ),
    status: z.optional(z.enum(eVehicleModelStatusModel, "Invalid status.")),
  })
  .refine(
    (value) => {
      const maxDiscount = value.discount.max ?? value.discount.min;
      if (maxDiscount === undefined) return true;

      const minPrice = value.price.min ?? value.price.max;
      if (minPrice === undefined) return true;

      return minPrice - 0.99 > maxDiscount;
    },
    {
      path: ["discount"],
      error: "discount should be less than the discount at least 1 dollar.",
    },
  )
  .strict();
type tVehicleModelFilter = z.infer<typeof zVehicleModelFilter>;

export type { tVehicleModelFilter };
export { zVehicleModelFilter };
