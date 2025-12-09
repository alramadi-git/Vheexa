import z from "zod";

import {
  eVehicleModelTransmissionModel,
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelUpdate = z
  .object({
    thumbnail: z.optional(z.url()),
    images: z
      .array(
        z.object({
          uuid: z.uuid(),
          url: z.optional(z.url()),
          index: z.optional(z.number().min(0, "index cannot be negative.")),
        }),
      )
      .refine((value) => {
        const indexes = new Set();
        value.forEach((v) => {
          if (v.index !== undefined) indexes.add(v.index);
        });

        return indexes.size === value.length;
      }),
    name: z.optional(z.string().nonempty()),
    description: z.optional(z.string().nonempty()),
    manufacturer: z.optional(z.string().nonempty()),
    modelYear: z.optional(
      z.number().min(1980, "model year cannot be older than 1980."),
    ),
    capacity: z.optional(z.number().min(1, "capacity cannot be negative.")),
    transmission: z.optional(z.enum(eVehicleModelTransmissionModel)),
    fuel: z.optional(z.enum(eVehicleModelFuelModel)),
    colors: z.object({
      name: z.string().nonempty(),
      hexCode: z.hex(),
      tags: z.array(z.string().nonempty()),
    }),
    price: z.optional(z.number().min(0, "price cannot be negative.")),
    discount: z.optional(z.number().min(0, "discount cannot be negative.")),
    tags: z.array(z.string().nonempty()),
    status: z.optional(z.enum(eVehicleModelStatusModel)),
  })
  .refine((value) => value.price > value.discount, {
    path: ["discount"],
    error: "discount should be less than the price.",
  })
  .strict();
type tVehicleModelUpdate = z.infer<typeof zVehicleModelUpdate>;

export type { tVehicleModelUpdate };
export { zVehicleModelUpdate };
