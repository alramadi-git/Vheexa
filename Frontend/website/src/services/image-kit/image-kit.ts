import { ClsAbstractService } from "../service";

import { tImageKitAuthenticatorModel } from "@/models/image-kit/authenticator";
import { UploadOptions, UploadResponse, upload } from "@imagekit/next";

class ClsImageKitService extends ClsAbstractService {
  public async authenticator(): Promise<tImageKitAuthenticatorModel> {
    // Perform the request to the upload authentication endpoint.
    const response: Response = await this._fetch.get(
      "/image-kit/authenticator",
    );
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(`ImageKit Authenticator Error: ${errorText}`);
    }

    // Parse and destructure the response JSON for upload credentials.
    const data: tImageKitAuthenticatorModel = await response.json();
    return data;
  }

  public async upload(options: UploadOptions): Promise<UploadResponse> {
    return await upload(options);
  }
}

export { ClsImageKitService };
