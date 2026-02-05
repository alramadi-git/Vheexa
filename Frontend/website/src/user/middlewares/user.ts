import { NextRequest, NextResponse } from "next/server";

import unauthenticatedMiddleware from "./unauthenticated";

export default function userMiddleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/user", 6))
    return NextResponse.next();

  let middlewares = unauthenticatedMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  return NextResponse.next();
}
