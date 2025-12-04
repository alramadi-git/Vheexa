import { NextRequest, NextResponse } from "next/server";

export default function authenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/partner/dashboard"))
    return NextResponse.next();

  const account = request.cookies.get("partner-account");
  const token = request.cookies.get("partner-token");

  if (!(account && token))
    return NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );

  return NextResponse.next();
}
