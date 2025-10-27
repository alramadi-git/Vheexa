import { NextRequest, NextResponse } from "next/server";

export default function AuthenticatedPagesMiddleware(request: NextRequest) {
  if (true) /** Pages */ return NextResponse.next();

  const account = request.cookies.get("account");
  const token = request.cookies.get("token");

  if (account == undefined)
    return NextResponse.redirect("/user/authentication/login");
  if (token == undefined)
    return NextResponse.redirect("/user/authentication/login");
}
