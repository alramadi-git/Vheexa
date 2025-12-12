import z from "zod";

import {
  eVehicleModelCategoryModel,
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
    name: z.string().nonempty("name cannot be empty."),
    description: z
      .string()
      .nonempty("description cannot be empty.")
      .max(750, "description cannot be longer than 750 characters."),
    category: z.enum(eVehicleModelCategoryModel),
    manufacturer: z.string().nonempty("manufacturer cannot be empty."),
    modelYear: z
      .number()
      .min(1980, "model year cannot be older than 1980.")
      .refine((value) => {
        const year = new Date().getFullYear();
        return value <= year;
      }, "model year cannot be in the future."),
    capacity: z.number().min(1, "capacity cannot be negative."),
    transmission: z.enum(eVehicleModelTransmissionModel),
    fuel: z.enum(eVehicleModelFuelModel),
    colors: z
      .array(
        z.object({
          name: z.string().nonempty(),
          hexCode: z.hex(),
          tags: z.array(
            z
              .string()
              .nonempty("tags cannot be empty.")
              .regex(/^[a-zA-Z]+(, [a-zA-Z]+)*$/, {
                message:
                  "Tags must be comma-separated followed by a space and contain only letters.",
              }),
          ),
        }),
      )
      .refine(
        (value) => new Set(value.map((v) => v.hexCode)).size === value.length,
      ),
    price: z.number().min(0, "price cannot be negative."),
    discount: z.number().min(0, "discount cannot be negative."),
    tags: z
      .string()
      .nonempty("tags cannot be empty.")
      .regex(/^[a-zA-Z]+(, [a-zA-Z]+)*$/, {
        message: "Tags must be comma-separated followed by a space and contain only letters.",
      }),
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
