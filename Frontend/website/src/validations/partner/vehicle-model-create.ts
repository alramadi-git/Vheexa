import z from "zod";

import {
  eVehicleModelCategoryModel,
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
        (images) =>
          new Set(images.map((image) => image.index)).size === images.length,
        "indices must be unique.",
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
    capacity: z.number().min(1, "capacity cannot be less than 1."),
    transmission: z.string().nonempty("transmission cannot be empty."),
    fuel: z.string().nonempty("fuel cannot be empty."),
    colors: z
      .array(
        z.object({
          hexCode: z.hex(),
          name: z.string().nonempty(),
          tags: z
            .array(
              z
                .string()
                .nonempty("tag cannot be empty.")
                .regex(/^[a-zA-Z]+(, [a-zA-Z]+)*$/, {
                  message:
                    "Tags must be comma-separated followed by a space and contain only letters.",
                }),
            )
            .refine(
              (tags) => new Set(tags.map((tag) => tag)).size === tags.length,
              "colors must be hex codes unique.",
            ),
        }),
      )
      .refine(
        (colors) =>
          new Set(colors.map((color) => color.hexCode)).size === colors.length,
        "colors must be hex codes unique.",
      ),
    price: z.number().min(1, "price cannot be less than 1."),
    discount: z.number().min(0, "discount cannot be negative."),
    tags: z
      .string()
      .nonempty("tag cannot be empty.")
      .regex(/^[a-zA-Z]+(, [a-zA-Z]+)*$/, {
        message:
          "Tags must be comma-separated followed by a space and contain only letters.",
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
