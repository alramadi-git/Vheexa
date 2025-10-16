"use client";

import type { tResponseOneModel } from "@/app/api/user/_models/response";
import z from "zod/v4";

const zCredentials = z.object({
  email: z.email(),
  password: z
    .string()
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(32, "Password must be at most 32 characters.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character.",
        )
        .regex(/^\S+$/, "Password must not contain any white spaces."),
    ),
});

type tCredentials = z.infer<typeof zCredentials>;

class AuthenticationService {
  public static async signin(
    credentials: tCredentials,
  ): Promise<tResponseOneModel<null>> {
    await fetch(`${process.env.NEXT_PUBLIC_API}/user/authentication/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return { data: null };
  }
}

export type { tCredentials };
export { zCredentials };

export { AuthenticationService };
