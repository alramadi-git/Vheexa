import z from "zod/v4";

const zEmail = z.email();
type tEmail = z.infer<typeof zEmail>;

const zPassword = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters.")
  .max(32, "Password must be at most 32 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character.",
  )
  .regex(/^\S+$/, "Password must not contain any white spaces.");
type tPassword = z.infer<typeof zPassword>;

const zLoginCredentials = z
  .object({
    email: zEmail,
    password: zPassword,
  })
  .strict();

type tLoginCredentials = z.infer<typeof zLoginCredentials>;

export type { tEmail, tPassword, tLoginCredentials };
export { zEmail, zPassword, zLoginCredentials };
