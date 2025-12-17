import z from "zod";

import { ePartnerRoleStatusModel } from "@/models/partner/partner-role";

import { zRole } from "../role";

const zMemberRole = z
  .object({
    status: z.enum(ePartnerRoleStatusModel),
  })
  .extend(zRole.shape)
  .strict();
type tMemberRole = z.infer<typeof zMemberRole>;

export type { tMemberRole };
export { zMemberRole };
