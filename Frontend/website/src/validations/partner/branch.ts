import z from "zod";

import { zLocationCreate } from "../location";

import { zPhoneNumber } from "../phone-number";

import { zEmail } from "../credentials";

import { eBranchStatusModel } from "@/models/partner/branch";

const zBranchCreate = z.object({
  location: zLocationCreate,
  name: z
    .string("branch name is required.")
    .nonempty("branch name cannot be empty."),
  phoneNumber: zPhoneNumber,
  email: zEmail,
  status: z.enum(eBranchStatusModel, "invalid status."),
});
type tBranchCreate = z.infer<typeof zBranchCreate>;

const zBranchFilter = z
  .object({
    search: z.optional(z.string().nonempty("branch name cannot be empty.")),
    status: z.optional(z.enum(eBranchStatusModel, "invalid status.")),
  })
  .strict();
type tBranchFilter = z.infer<typeof zBranchFilter>;

export type { tBranchCreate, tBranchFilter };
export { zBranchCreate, zBranchFilter };
