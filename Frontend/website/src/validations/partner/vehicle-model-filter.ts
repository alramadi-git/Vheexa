import z from "zod";

import {
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelFilter = z
  .object({
    search: z.string(), // name, manufacturer, tags
    modelYear: z
      .number()
      .min(1980, "model year cannot be older than 1980.")
      .refine(
        (value) => value <= new Date().getFullYear(),
        "model year cannot be in the future.",
      ),
    price: z
      .object({
        min: z.number().min(0, "price cannot be negative."),
        max: z.number().min(0, "price cannot be negative."),
      })
      .refine(
        (value) => value.min <= value.max,
        "min price should be less than, equal to max price or leave it blank.",
      ),
    discount: z
      .object({
        min: z.number().min(0, "discount cannot be negative."),
        max: z.number().min(0, "discount cannot be negative."),
      })
      .refine(
        (value) => value.min <= value.max,
        "min discount should be less than, equal to max discount or leave it blank.",
      ),
    capacity: z
      .object({
        min: z.number().min(0, "capacity cannot be negative."),
        max: z.number().min(0, "capacity cannot be negative."),
      })
      .refine(
        (value) => value.min <= value.max,
        "min capacity should be less than, equal to max capacity or leave it blank.",
      ),
    colors: z.array(z.string()),
    transmissions: z.array(z.enum(eVehicleModelTransmissionModel)),
    fuels: z.array(z.enum(eVehicleModelFuelModel)),
    statuses: z.array(z.enum(eVehicleModelStatusModel)),
  })
  .strict()
  .refine((value) => {
  value.
    return true;
  });
type tVehicleModelFilter = z.infer<typeof zVehicleModelFilter>;

export type { tVehicleModelFilter };
export { zVehicleModelFilter };
