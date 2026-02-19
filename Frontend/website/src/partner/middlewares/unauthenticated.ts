import { NextRequest, NextResponse } from "next/server";

export default function unauthenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner/authentication", 6)) {
    return NextResponse.next();
  }

  const account = request.cookies.get("member-account")?.value;
  const accessToken = request.cookies.get("member-access-token")?.value;
  const refreshToken = request.cookies.get("member-refresh-token")?.value;

  if (
    account !== undefined &&
    accessToken !== undefined &&
    refreshToken !== undefined
  ) {
    return NextResponse.redirect(
      new URL("/partner/dashboard", request.nextUrl.origin),
    );
  }

  return NextResponse.next();
}
