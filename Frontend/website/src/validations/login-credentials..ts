import z from "zod";

import { zEmail } from "./email";
import { zPassword } from "./password";

const zLoginCredentials = z.object({
  email: zEmail,
  password: zPassword,
});
type tLoginCredentials = z.infer<typeof zLoginCredentials>;

export type { tLoginCredentials };
export { zLoginCredentials };
