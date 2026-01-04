import z from "zod";

import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

const zVehicleModelCreate = z
  .object({
    thumbnail: z
      .file("expected thumbnail file (e.g. png, jpg, etc...)")
      .refine((value) => value.type.startsWith("image/"), {
        error: "only images are allowed",
      }),
    gallery: z
      .array(
        z
          .file("expected thumbnail file (e.g. png, jpg, etc...)")
          .refine((value) => value.type.startsWith("image/"), {
            error: "only images are allowed",
          }),
      )
      .max(25, "you can upload a maximum of 25 images."),
    name: z.string().nonempty("name cannot be empty."),
    description: z
      .string()
      .nonempty("description cannot be empty.")
      .max(750, "description cannot be longer than 750 characters."),
    category: z.enum(eVehicleModelCategoryModel, "invalid category."),
    manufacturer: z.string().nonempty("manufacturer cannot be empty."),
    marketLaunch: z
      .date()
      .min(new Date(1980, 0, 1), "model year cannot be older than 1980.")
      .refine(
        (value) => value <= new Date(),
        "model year cannot be in the future.",
      ),
    capacity: z.number().min(1, "capacity cannot be less than 1."),
    transmission: z.string().nonempty("transmission cannot be empty."),
    fuel: z.string().nonempty("fuel cannot be empty."),
    colors: z
      .array(
        z.object({
          hexCode: z.string().regex(/^#([0-9a-fA-F]{6})$/, "invalid hex code."),
          name: z.string().nonempty("color name cannot be empty."),
          tags: z
            .array(
              z
                .string()
                .nonempty("tag cannot be empty.")
                .regex(/^[a-zA-Z]+(, [a-zA-Z]+)*$/, {
                  error:
                    "tags must be comma-separated followed by a space and contain only letters.",
                }),
            )
            .refine(
              (tags) => new Set(tags.map((tag) => tag)).size === tags.length,
              "colors must be hex codes unique.",
            ),
        }),
      )
      .min(1, "at least one color is required.")
      .refine(
        (colors) =>
          new Set(colors.map((color) => color.hexCode)).size === colors.length,
        "colors must be hex codes unique.",
      ),
    price: z.number().min(1, "price cannot be less than 1."),
    discount: z.number().nonnegative("discount cannot be negative."),
    tags: z.array(z.string().nonempty("tag cannot be empty.")),
    status: z.enum(eVehicleModelStatusModel, "invalid status."),
  })
  .refine((value) => value.price - 0.99 > value.discount, {
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
        .nonempty("search can only either be undefined or a non-empty string."),
    ),
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
