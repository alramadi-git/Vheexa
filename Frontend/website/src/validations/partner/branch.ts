import z from "zod";

import { eBranchStatusModel } from "@/models/partner/branch";
import { zLocation } from "../location";

const zBranch = z
  .object({
    status: z.enum(eBranchStatusModel),
  })
  .extend(zLocation);
type tBranch = z.infer<typeof zBranch>;

export type { tBranch };
export { zBranch };
