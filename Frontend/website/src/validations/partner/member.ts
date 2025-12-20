import z from "zod";

import { zHumanCreate, zHumanFilter } from "../human";

import { zRoleCreate } from "./role";
import { zBranchCreate } from "./branch";

import { eMemberStatusModel } from "@/models/partner/member";

const zMemberCreate = z
  .object({
    role: zRoleCreate,
    branch: zBranchCreate,
    status: z.enum(eMemberStatusModel, "invalid status."),
  })
  .extend(zHumanCreate.shape)
  .strict();
type tMemberCreate = z.infer<typeof zMemberCreate>;

const zMemberFilter = z
  .object({
    status: z.optional(z.enum(eMemberStatusModel, "invalid status.")),
  })
  .extend(zHumanFilter.shape)
  .strict();
type tMemberFilter = z.infer<typeof zMemberFilter>;

export type { tMemberCreate, tMemberFilter };
export { zMemberCreate, zMemberFilter };
