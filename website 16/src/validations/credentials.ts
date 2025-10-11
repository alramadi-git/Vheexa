import { z } from "zod/v4";

type TCredentials = {
  email: string;
  password: string;
};

const zCredentials = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must not exceed 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must include uppercase, lowercase, number, and special character",
      ),
  })
  .strict();

export type { TCredentials };
export { zCredentials };
