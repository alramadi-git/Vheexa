import z from "zod";

import { ePartnerRoleStatusModel } from "@/models/partner/partner-role";
import { ePartnerRoleCreatePermission } from "./role-create";

const zPartnerRoleFilter = z
  .object({
    name: z.optional(z.string()),
    permissions: z.array(
      z.enum(ePartnerRoleCreatePermission, "Invalid permission."),
    ),
    status: z.optional(z.enum(ePartnerRoleStatusModel)),
  })
  .strict();
type tPartnerRoleFilter = z.infer<typeof zPartnerRoleFilter>;

export type { tPartnerRoleFilter as tPartnerRoleFilter };
export { zPartnerRoleFilter as zPartnerRoleFilter };
