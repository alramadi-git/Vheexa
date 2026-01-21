import { NextRequest, NextResponse } from "next/server";

import { zJwt } from "@/validations/jwt";
import { zAccount } from "@/validations/partner/account";

export default function authenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/partner/dashboard"))
    return NextResponse.next();

  if (
    !zJwt.safeParse(
      JSON.parse(request.cookies.get("member-token")?.value ?? "null"),
    ).success ||
    !zAccount.safeParse(
      JSON.parse(request.cookies.get("member-account")?.value ?? "null"),
    ).success
  ) {
    request.cookies.delete("member-token");
    request.cookies.delete("member-account");

    return NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );
  }

  return NextResponse.next();
}
