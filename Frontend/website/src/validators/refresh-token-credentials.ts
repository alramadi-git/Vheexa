import z from "zod";

import { zUuid } from "./uuid";
import { zRefreshToken } from "./tokens";

const zRefreshTokenCredentials = z
  .object({
    uuid: zUuid,
    refreshToken: zRefreshToken,
  })
  .strict();
type tRefreshTokenCredentials = z.infer<typeof zRefreshTokenCredentials>;

export type { tRefreshTokenCredentials };
export { zRefreshTokenCredentials };
