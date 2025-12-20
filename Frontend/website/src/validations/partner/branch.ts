import z from "zod";

import { zLocationCreate } from "../location";

import { zPhoneNumber } from "../phone-number";

import { zEmail } from "../authentication-credentials";

import { eBranchStatusModel } from "@/models/partner/branch";

const zBranchCreate = z
  .object({
    name: z.string().nonempty("branch name is required."),
    phoneNumber: zPhoneNumber,
    email: zEmail,
    status: z.enum(eBranchStatusModel, "invalid status."),
  })
  .extend(zLocationCreate.shape);
type tBranchCreate = z.infer<typeof zBranchCreate>;

const zBranchFilter = z
  .object({
    search: z.optional(z.string().trim()),
    status: z.optional(z.enum(eBranchStatusModel, "invalid status.")),
  })
  .strict();
type tBranchFilter = z.infer<typeof zBranchFilter>;

export type { tBranchCreate, tBranchFilter };
export { zBranchCreate, zBranchFilter };
