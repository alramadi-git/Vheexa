import { NextRequest, NextResponse } from "next/server";

export default function unauthenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/user/authentication", 6))
    return NextResponse.next();

  const account = request.cookies.get("user-account");
  const token = request.cookies.get("user-token");

  if (account && token)
    return NextResponse.redirect(new URL("/user", request.nextUrl.origin));

  return NextResponse.next();
}
