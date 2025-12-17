import z from "zod";

import { zLocation } from "../location";
import { zPhoneNumber } from "../phone-number";

import { eBranchStatusModel } from "@/models/partner/branch";

const zBranchCreate = z
  .object({
    name: z.string().nonempty("Branch name is required."),
    phoneNumber: zPhoneNumber,
    email: z.email(),
    status: z.enum(
      eBranchStatusModel,
      "Invalid status, try select (e.g., Active, Inactive).",
    ),
  })
  .extend(zLocation.shape);
type tBranchCreate = z.infer<typeof zBranchCreate>;

export type { tBranchCreate };
export { zBranchCreate };
