import z from "zod";

import {
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelFilter = z
  .object({
    search: z.optional(z.string().trim()), // name, manufacturer, tags
    modelYears: z.array(
      z
        .number()
        .min(1980, "model year cannot be older than 1980.")
        .refine((value) => value <= new Date().getFullYear(), {
          path: ["modelYears"],
          error: "model year cannot be in the future.",
        }),
    ),
    capacity: z
      .object({
        min: z.optional(z.number().min(0, "capacity cannot be negative.")),
        max: z.optional(z.number().min(0, "capacity cannot be negative.")),
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
    transmissions: z.array(z.enum(eVehicleModelTransmissionModel)),
    fuels: z.array(z.enum(eVehicleModelFuelModel)),
    colors: z.array(z.string().nonempty()),
    price: z
      .object({
        min: z.optional(z.number().min(0, "price cannot be negative.")),
        max: z.optional(z.number().min(0, "price cannot be negative.")),
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
        min: z.optional(z.number().min(0, "discount cannot be negative.")),
        max: z.optional(z.number().min(0, "discount cannot be negative.")),
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
    statuses: z.array(z.enum(eVehicleModelStatusModel)),
  })
  .refine(
    (value) => {
      const maxDiscount = value.discount.max ?? value.discount.min;
      if (maxDiscount === undefined) return true;

      const minPrice = value.price.min ?? value.price.max;
      if (minPrice === undefined) return true;

      return minPrice > maxDiscount;
    },
    {
      path: ["discount"],
      error: "price should be greater than the discount.",
    },
  )
  .strict();
type tVehicleModelFilter = z.infer<typeof zVehicleModelFilter>;

export type { tVehicleModelFilter };
export { zVehicleModelFilter };
