import { NextRequest, NextResponse } from "next/server";

import { zJwt } from "@/validators/jwt";
import { zAccount } from "@/partner/validators/account";

export default function authenticatedProxy(
  request: NextRequest,
): NextResponse {
  if (!request.nextUrl.pathname.includes("/partner/dashboard")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("member-access-token")?.value;
  if (!zJwt.safeParse(accessToken).success) {
    request.cookies.delete("member-access-token");
    request.cookies.delete("member-account");

    return NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );
  }

  const account = request.cookies.get("member-account")?.value ?? "null";
  try {
    zAccount.parse(JSON.parse(account));
  } catch {
    request.cookies.delete("member-access-token");
    request.cookies.delete("member-account");

    return NextResponse.redirect(
      new URL("/partner/authentication/login", request.nextUrl.origin),
    );
  }

  return NextResponse.next();
}
