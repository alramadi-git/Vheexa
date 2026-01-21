import { NextRequest, NextResponse } from "next/server";

import { zJwt } from "@/validations/jwt";
import { zAccount } from "@/validations/partner/account";

export default function unauthenticatedMiddleware(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner/authentication", 6))
    return NextResponse.next();

  if (
    zJwt.safeParse(request.cookies.get("member-token")?.value ?? "null")
      .success &&
    zAccount.safeParse(request.cookies.get("member-account")?.value ?? "null")
      .success
  ) {
    return NextResponse.redirect(
      new URL("/partner/dashboard", request.nextUrl.origin),
    );
  }

  request.cookies.delete("member-token");
  request.cookies.delete("member-account");

  return NextResponse.next();
}
