import z from "zod";

const zEmail = z.email();
type tEmail = z.infer<typeof zEmail>;

const zPassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .max(32, { message: "Password must be at most 32 characters." })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character.",
  })
  .regex(/^\S+$/, {
    message: "Password must not contain spaces.",
  });
type tPassword = z.infer<typeof zPassword>;

const zLoginCredentials = z
  .object({
    email: zEmail,
    password: zPassword,
    rememberMe: z.boolean(),
  })
  .strict();
type tLoginCredentials = z.infer<typeof zLoginCredentials>;

export type { tEmail, tPassword, tLoginCredentials };
export { zEmail, zPassword, zLoginCredentials };
