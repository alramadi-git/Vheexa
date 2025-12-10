import z from "zod";

import {
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelCreate = z
  .object({
    thumbnail: z.url(),
    images: z
      .array(
        z.object({
          url: z.url(),
          index: z.number().min(0, "index cannot be negative."),
        }),
      )
      .refine(
        (value) => new Set(value.map((v) => v.index)).size === value.length,
      ),
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    manufacturer: z.string().nonempty(),
    modelYear: z.number().min(1980, "model year cannot be older than 1980."),
    capacity: z.number().min(1, "capacity cannot be negative."),
    transmission: z.enum(eVehicleModelTransmissionModel),
    fuel: z.enum(eVehicleModelFuelModel),
    colors: z
      .array(
        z.object({
          name: z.string().nonempty(),
          hexCode: z.hex(),
          tags: z.array(z.string().nonempty()),
        }),
      )
      .refine(
        (value) => new Set(value.map((v) => v.hexCode)).size === value.length,
      ),
    price: z.number().min(0, "price cannot be negative."),
    discount: z.number().min(0, "discount cannot be negative."),
    tags: z.string().nonempty(),
    status: z.enum(eVehicleModelStatusModel),
  })
  .refine((value) => value.price > value.discount, {
    path: ["discount"],
    error: "discount should be less than the price.",
  })
  .strict();
type tVehicleModelCreate = z.infer<typeof zVehicleModelCreate>;

export type { tVehicleModelCreate };
export { zVehicleModelCreate };
