import z from "zod";

import { eMemberRoleStatusModel } from "@/models/partner/member-role";

import { zRole } from "../role";

const zMemberRole = z
  .object({
    status: z.enum(eMemberRoleStatusModel),
  })
  .extend(zRole.shape)
  .strict();
type tMemberRole = z.infer<typeof zMemberRole>;

export type { tMemberRole };
export { zMemberRole };
