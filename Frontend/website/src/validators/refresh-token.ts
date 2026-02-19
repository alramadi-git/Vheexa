import z from "zod";

const zRefreshToken = z
  .string()
  .length(44, "Invalid refresh token.")
  .regex(/^[a-zA-Z0-9+/=]+$/, "Invalid refresh token.");
type tRefreshToken = z.infer<typeof zRefreshToken>;

export type { tRefreshToken };
export { zRefreshToken };
