import { NextRequest, NextResponse } from "next/server";

import { zJwt } from "@/validators/jwt";
import { zMemberAccount } from "@/partner/validators/member-account";

export default function authenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/partner/dashboard")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("member-access-token")?.value;
  if (!zJwt.safeParse(accessToken).success) {
    const response = NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );

    response.cookies.delete("member-access-token");
    response.cookies.delete("member-account");

    return response;
  }

  const account = request.cookies.get("member-account")?.value ?? "null";
  try {
    zMemberAccount.parse(JSON.parse(account));
  } catch {
    const response = NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );

    response.cookies.delete("member-access-token");
    response.cookies.delete("member-account");

    return response;
  }

  return NextResponse.next();
}
