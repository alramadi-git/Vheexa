import z from "zod";

import { eVehicleModelCategoryService } from "./enums/vehicle-model";
import { eStatusService } from "./enums/status";

const zVehicleModelCreate = z
  .object({
    thumbnail: z.optional(
      z
        .file()
        .max(2 * 1024 * 1024, "avatar must be at most 2 MB.")
        .mime(["image/jpeg", "image/png"]),
    ),
    gallery: z
      .array(
        z
          .file()
          .max(2 * 1024 * 1024, "avatar must be at most 2 MB.")
          .mime(["image/jpeg", "image/png"]),
      )
      .max(25, "you can upload a maximum of 25 images."),
    name: z
      .string("name is required.")
      .trim()
      .min(2, "vehicle name must be at least 2 characters.")
      .max(80, "vehicle name must be at most 80 characters."),
    description: z
      .string()
      .trim()
      .max(750, "description cannot be longer than 750 characters."),
    category: z.enum(eVehicleModelCategoryService, "invalid category."),
    manufacturer: z
      .string()
      .trim()
      .min(2, "manufacturer must be at least 2 characters.")
      .max(60, "manufacturer must be at most 60 characters."),
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
      .trim()
      .min(3, "transmission must be at least 3 characters.")
      .max(30, "transmission must be at most 30 characters."),
    fuel: z
      .string("fuel is required.")
      .trim()
      .min(3, "fuel must be at least 3 characters.")
      .max(30, "fuel must be at most 30 characters."),
    price: z
      .number("price is required.")
      .min(1, "price cannot be less than 1."),
    discount: z
      .number("discount is required.")
      .nonnegative("discount cannot be negative."),
    tags: z
      .string()
      .trim()
      .min(3, "tags must be at least 3 characters.")
      .max(256, "tags must be at most 256 characters."),
    status: z.enum(eStatusService, "status is required."),
  })
  .refine((value) => value?.discount + 1 >= value?.price, {
    path: ["discount"],
    error: "discount should be less than the price at least 1 dollar.",
  })
  .strict();
type tVehicleModelCreate = z.infer<typeof zVehicleModelCreate>;

const zVehicleModelFilter = z
  .object({
    search: z.optional(
      z
        .string()
        .trim()
        .nonempty("search must not be empty.")
        .max(256, "search must be at most 256 characters."),
    ),
    categories: z
      .array(z.enum(eVehicleModelCategoryService, "invalid category."))
      .max(8, "you can filter a maximum of 8 categories."),
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
          if (value.min === undefined || value.max === undefined) return true;
          return value.min <= value.max;
        },
        {
          path: ["capacity"],
          error:
            "the minimum capacity must be less than or equal to the maximum capacity.",
        },
      ),
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
          if (value.min === undefined || value.max === undefined) return true;
          return value.min <= value.max;
        },
        {
          path: ["price"],
          error:
            "the minimum price must be less than or equal to the maximum price.",
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
          if (value.min === undefined || value.max === undefined) return true;
          return value.min <= value.max;
        },
        {
          path: ["discount"],
          error:
            "the minimum discount must be less than or equal to the maximum discount.",
        },
      ),
    status: z.optional(z.enum(eStatusService, "invalid status.")),
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
