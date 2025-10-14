import { tCredentials } from "@/validations/credentials";

class AuthenticationService {
  public static async signin(credentials: tCredentials) {
    return await fetch("/api/user/authentication/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  }
}

export { AuthenticationService };
