import z from "zod";

import { zUuid } from "./uuid";

const zRole = z
  .object({
    name: z.string().nonempty("Role name is required."),
    permissions: z.array(zUuid),
  })
  .strict();
type tRole = z.infer<typeof zRole>;

export type { tRole };
export { zRole };
