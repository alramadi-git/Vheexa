import z from "zod";

import { zPhoneNumber } from "../phone-number";
import { zEmail } from "../credentials";

import { eBranchStatusModel } from "@/models/partner/branch";

const zBranchCreate = z.object({
  location: z
    .object({
      country: z
        .string("country is required.")
        .trim()
        .min(2, "country must be at least 2 characters.")
        .max(56, "country must be at most 56 characters."),
      city: z
        .string("city is required.")
        .trim()
        .min(2, "city must be at least 2 characters.")
        .max(85, "city must be at most 85 characters."),
      street: z
        .string("street is required.")
        .trim()
        .min(3, "street must be at least 3 characters.")
        .max(150, "street must be at most 150 characters."),
      latitude: z
        .number("Latitude is required.")
        .min(-90, "latitude must not be less than -90.")
        .max(90, "latitude must not be greater than 90."),
      longitude: z
        .number("Longitude is required.")
        .min(-180, "longitude must not be less than -180.")
        .max(180, "longitude must not be greater than 180."),
    })
    .strict(),
  name: z
    .string("branch name is required.")
    .trim()
    .min(2, "branch name must be at least 3 characters.")
    .max(80, "branch name must be at most 25 characters."),
  phoneNumber: zPhoneNumber,
  email: zEmail,
  status: z.enum(eBranchStatusModel, "invalid status."),
});
type tBranchCreate = z.infer<typeof zBranchCreate>;

const zBranchFilter = z
  .object({
    search: z.optional(
      z
        .string()
        .trim()
        .nonempty("search must not be empty.")
        .max(256, "search must be at most 256 characters."),
    ),
    status: z.optional(z.enum(eBranchStatusModel, "invalid status.")),
  })
  .strict();
type tBranchFilter = z.infer<typeof zBranchFilter>;

export type { tBranchCreate, tBranchFilter };
export { zBranchCreate, zBranchFilter };
