import { NextRequest, NextResponse } from "next/server";

export default function authenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/user/profile"))
    return NextResponse.next();

  const account = request.cookies.get("user-account");
  const token = request.cookies.get("user-token");

  if (!(account && token))
    return NextResponse.redirect(
      new URL("/user/authentication/login", request.nextUrl.origin),
    );

  return NextResponse.next();
}
