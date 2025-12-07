import z from "zod";

import { eMemberStatusModel } from "@/models/partner/member";

import { zHuman } from "../human";

import { zMemberRole } from "./member-role";
import { zBranch } from "./branch";

const zMember = z
  .object({
    role: zMemberRole,
    branch: zBranch,
    status: z.enum(eMemberStatusModel),
  })
  .extend(zHuman)
  .strict();
type tMember = z.infer<typeof zMember>;

export type { tMember };
export { zMember };
