import z from "zod";

const zPassword = z
  .string()
  .min(8, { message: "Password must be at least 8" })
  .max(32, { message: "Password must be at most 32" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  .regex(/^\S+$/, {
    message: "Password must not contain spaces",
  });
type tPassword = z.infer<typeof zPassword>;

export type { tPassword };
export { zPassword };
