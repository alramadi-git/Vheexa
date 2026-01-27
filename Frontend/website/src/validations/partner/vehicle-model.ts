import z from "zod";

import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelCreate = z
  .object({
    thumbnail: z
      .file("thumbnail is required.")
      .refine((value) => value.type.startsWith("image/"), {
        error: "thumbnail can only be an image(e.g, png, jpg, etc...).",
      }),
    gallery: z
      .array(
        z.file().refine((value) => value.type.startsWith("image/"), {
          error: "gallery image can only be an image(e.g, png, jpg, etc...).",
        }),
      )
      .max(25, "you can upload a maximum of 25 images."),
    name: z.string("name is required.").nonempty("name cannot be empty."),
    description: z
      .string()
      .max(750, "description cannot be longer than 750 characters."),
    category: z.enum(eVehicleModelCategoryModel, "invalid category."),
    manufacturer: z.string().nonempty("manufacturer cannot be empty."),
    marketLaunch: z
      .date("market launch is required.")
      .min(new Date(1980, 0, 1), "model year cannot be older than 1980.")
      .refine(
        (value) => value <= new Date(),
        "model year cannot be in the future.",
      ),
    capacity: z
      .number("capacity is required.")
      .min(1, "capacity cannot be less than 1."),
    transmission: z
      .string("transmission is required.")
      .nonempty("transmission cannot be empty."),
    fuel: z.string("fuel is required.").nonempty("fuel cannot be empty."),
    price: z
      .number("price is required.")
      .min(1, "price cannot be less than 1."),
    discount: z
      .number("discount is required.")
      .nonnegative("discount cannot be negative."),
    tags: z.array(z.string().nonempty("tag cannot be empty.")),
    status: z.enum(eVehicleModelStatusModel, "status is required."),
  })
  .refine((value) => value?.price - 0.99 > value?.discount, {
    path: ["discount"],
    error: "discount should be less than the price at least 1 dollar.",
  })
  .strict();
type tVehicleModelCreate = z.infer<typeof zVehicleModelCreate>;

const zVehicleModelFilter = z
  .object({
    search: z.optional(z.string().nonempty("search can't be empty.")),
    categories: z.array(
      z.enum(eVehicleModelCategoryModel, "invalid category."),
    ),
    capacity: z
      .object({
        min: z.optional(
          z.number().nonnegative("min capacity cannot be negative."),
        ),
        max: z.optional(
          z.number().nonnegative("max capacity cannot be negative."),
        ),
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
    price: z
      .object({
        min: z.optional(
          z.number().nonnegative("min price cannot be negative."),
        ),
        max: z.optional(
          z.number().nonnegative("max price cannot be negative."),
        ),
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
        min: z.optional(
          z.number().nonnegative("min discount cannot be negative."),
        ),
        max: z.optional(
          z.number().nonnegative("max discount cannot be negative."),
        ),
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
    status: z.optional(z.enum(eVehicleModelStatusModel, "invalid status.")),
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

export type { tVehicleModelCreate, tVehicleModelFilter };
export { zVehicleModelCreate, zVehicleModelFilter };
