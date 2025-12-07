import z from "zod";

import { zPartner } from "./partner";
import { zMember } from "./member";

const zRegisterCredentials = z
  .object({
    partner: zPartner,
    member: zMember,
    rememberMe: z.boolean(),
  })
  .strict();
type tRegisterCredentials = z.infer<typeof zRegisterCredentials>;

export type { tRegisterCredentials };
export { zRegisterCredentials };
