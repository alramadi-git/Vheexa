import { ClsFetch } from "@/libraries/fetch";

class ClsAuthenticationService {
  private readonly _fetch = new ClsFetch(
    process.env.NEXT_PUBLIC_BASE_DOMAIN!,
    "/api/image-kit/authenticator",
  );

  public constructor() {}

  public async authenticator(): Promise<any | Error> {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await this._fetch.get("");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error: unknown) {
      return error as Error;
    }
  }
}

export { ClsAuthenticationService };
