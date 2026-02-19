import z from "zod";

import { zUuid } from "./uuid";
import { zRefreshToken } from "./refresh-token";

const zRefreshTokensCredentials = z
  .object({
    uuid: zUuid,
    refreshToken: zRefreshToken,
  })
  .strict();
type tRefreshTokensCredentials = z.infer<typeof zRefreshTokensCredentials>;

export type { tRefreshTokensCredentials };
export { zRefreshTokensCredentials };
