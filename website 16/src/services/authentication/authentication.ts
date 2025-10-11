import { TCredentials } from "@/validations/credentials";

class Authentication {
  public static async signin(credentials: TCredentials) {
    return await fetch("/api/user/authentication/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  }
}

export { Authentication };
