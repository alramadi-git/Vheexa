import z from "zod";

import { zHuman } from "../human";

import { zPartnerRoleCreate } from "./role-create";
import { zBranchCreate } from "./branch-create";

import { eMemberStatusModel } from "@/models/partner/member";

const zMember = z
  .object({
    role: zPartnerRoleCreate,
    branch: zBranchCreate,
    status: z.enum(
      eMemberStatusModel,
      "Invalid status, try select (e.g., Active, Inactive).",
    ),
  })
  .extend(zHuman.shape)
  .strict();
type tMember = z.infer<typeof zMember>;

export type { tMember };
export { zMember };
