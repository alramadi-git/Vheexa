import { NextRequest, NextResponse } from "next/server";

export default function NonAuthenticatedPagesMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/user/authentication"))
    return NextResponse.next();

  const account = request.cookies.get("user-account");
  const token = request.cookies.get("user-token");

  if (account !== undefined && token !== undefined)
    return NextResponse.redirect(new URL("/user", request.nextUrl));

  return NextResponse.next();
}
