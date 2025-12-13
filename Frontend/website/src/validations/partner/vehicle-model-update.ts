import z from "zod";

import { eVehicleModelStatusModel } from "@/models/partner/vehicle-model";
import { zUuid } from "../uuid";

const zVehicleModelUpdate = z
  .object({
    thumbnail: z.optional(z.url()),
    images: z.array(
      z.object({
        uuid: zUuid,
        url: z.url(),
        index: z.number().min(0, "index cannot be negative."),
      }),
    ),
    name: z.optional(z.string().nonempty()),
    description: z.optional(z.string().nonempty()),
    manufacturer: z.optional(z.string().nonempty()),
    modelYear: z.optional(
      z.number().min(1980, "model year cannot be older than 1980."),
    ),
    capacity: z.optional(z.number().min(1, "capacity cannot be negative.")),
    transmission: z.optional(
      z.string().nonempty("transmission cannot be empty."),
    ),
    fuel: z.optional(z.string().nonempty("fuel cannot be empty.")),
    colors: z.array(
      z.object({
        uuid: zUuid,
        name: z.string().nonempty("color cannot be empty."),
        hexCode: z.hex(),
        tags: z.array(z.string().nonempty("tag cannot be empty.")),
      }),
    ),
    price: z.optional(z.number().min(0, "price cannot be negative.")),
    discount: z.optional(z.number().min(0, "discount cannot be negative.")),
    tags: z.optional(z.string().nonempty("tag cannot be empty.")),
    status: z.optional(z.enum(eVehicleModelStatusModel)),
  })

  .strict();
type tVehicleModelUpdate = z.infer<typeof zVehicleModelUpdate>;

export type { tVehicleModelUpdate };
export { zVehicleModelUpdate };
