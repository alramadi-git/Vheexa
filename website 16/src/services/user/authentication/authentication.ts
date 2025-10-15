import { tResponseOne } from "./../../types/response";
import { tCredentials } from "./../types/credentials";

class AuthenticationService {
  public static async signin(
    credentials: tCredentials,
  ): Promise<tResponseOne<null>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/authentication/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const responseBody = await response.json();

    if (response.ok === false) return responseBody;
    return responseBody;
  }
}

export { AuthenticationService };
