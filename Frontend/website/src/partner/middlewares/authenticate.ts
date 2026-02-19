import { NextRequest, NextResponse } from "next/server";

export default function authenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/partner/dashboard")) {
    return NextResponse.next();
  }

  const account = request.cookies.get("member-account")?.value;
  const accessToken = request.cookies.get("member-access-token")?.value;
  const refreshToken = request.cookies.get("member-refresh-token")?.value;

  if (
    account === undefined ||
    accessToken === undefined ||
    refreshToken === undefined
  ) {
    const response = NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );

    response.cookies.delete("member-access-token");
    response.cookies.delete("member-refresh-token");
    response.cookies.delete("member-account");

    return response;
  }

  return NextResponse.next();
}
