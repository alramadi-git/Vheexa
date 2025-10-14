import { z } from "zod/v4";

const zCredentials = z
  .object({
    Email: z.email(),
    Password: z
      .string()
      .transform((password) => password.trim())
      .pipe(
        z
          .string()
          .min(8, "Password must be at least 8 characters")
          .max(32, "Password must not exceed 32 characters")
          .regex(/^\S+$/, "Password must not contain any white spaces")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/\d/, "Password must contain at least one number")
          .regex(
            /\W|_/,
            "Password must contain at least one special character",
          ),
      ),
  })
  .strict();

type tCredentials = z.infer<typeof zCredentials>;

export type { tCredentials };
export { zCredentials };
