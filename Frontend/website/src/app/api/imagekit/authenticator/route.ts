import { NextResponse } from "next/server";

import { getUploadAuthParams } from "@imagekit/next/server";
import { tImageKitAuthenticatorModel } from "@/models/imagekit/authenticator";

export async function GET(): Promise<
  NextResponse<tImageKitAuthenticatorModel>
> {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response

  const { token, expire, signature } = getUploadAuthParams({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // Never expose this on client side
    // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    // token: "random-token", // Optional, a unique token for request
  });

  return NextResponse.json<tImageKitAuthenticatorModel>({
    token,
    expire,
    signature,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  });
}
