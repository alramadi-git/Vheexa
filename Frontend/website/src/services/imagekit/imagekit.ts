import { ClsAbstractService } from "../service";

import { tImageKitAuthenticatorModel } from "@/models/imagekit/authenticator";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  UploadOptions,
  UploadResponse,
  upload,
} from "@imagekit/next";

class ClsImageKitService extends ClsAbstractService {
  public async authenticator(): Promise<tImageKitAuthenticatorModel> {
    // Perform the request to the upload authentication endpoint.
    const response: Response = await this._fetch.get("/imagekit/authenticator");
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
    try {
      return await upload(options);
    } catch (error: unknown) {
      if (error instanceof ImageKitAbortError) {
        throw new Error(`Imagekit Upload aborted ${error.reason}`);
      } else if (error instanceof ImageKitInvalidRequestError) {
        throw new Error(`Imagekit Invalid request ${error.message}`);
      } else if (error instanceof ImageKitUploadNetworkError) {
        throw new Error(`Imagekit Network error ${error.message}`);
      } else if (error instanceof ImageKitServerError) {
        throw new Error(`Imagekit Server error ${error.message}`);
      } else if (error instanceof Error) {
        throw new Error(`Imagekit unknown error ${error.message}`);
      } else {
        throw new Error(`Imagekit unknown error ${error}`);
      }
    }
  }
}

export { ClsImageKitService };
