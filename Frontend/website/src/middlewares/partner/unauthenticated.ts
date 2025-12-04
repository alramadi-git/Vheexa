import { NextRequest, NextResponse } from "next/server";

export default function unauthenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner/authentication", 6))
    return NextResponse.next();

  const account = request.cookies.get("partner-account");
  const token = request.cookies.get("partner-token");

  if (account && token)
    return NextResponse.redirect(new URL("/partner", request.nextUrl.origin));

  return NextResponse.next();
}
