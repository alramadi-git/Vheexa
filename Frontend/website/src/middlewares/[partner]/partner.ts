import { NextRequest, NextResponse } from "next/server";

import authenticatedMiddleware from "./authenticate";
import unauthenticatedMiddleware from "./unauthenticated";

export default function partnerMiddleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner", 6))
    return NextResponse.next();

  /** pages you should not access when you are authenticated */
  let middlewares = authenticatedMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  middlewares = unauthenticatedMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  return NextResponse.next();
}
