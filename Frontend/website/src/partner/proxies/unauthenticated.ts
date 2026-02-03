import { NextRequest, NextResponse } from "next/server";

export default function unauthenticatedProxy(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner/authentication", 6)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("member-access-token")?.value;
  const account = request.cookies.get("member-account")?.value;

  if (accessToken && account) {
    return NextResponse.redirect(
      new URL("/partner/dashboard", request.nextUrl.origin),
    );
  }

  return NextResponse.next();
}
