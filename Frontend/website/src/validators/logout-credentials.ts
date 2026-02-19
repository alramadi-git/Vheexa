import z from "zod";

import { zRefreshToken } from "./refresh-token";

const zLogoutCredentials = z
  .object({
    refreshToken: zRefreshToken,
  })
  .strict();
type tLogoutCredentials = z.infer<typeof zLogoutCredentials>;

export type { tLogoutCredentials };
export { zLogoutCredentials };
