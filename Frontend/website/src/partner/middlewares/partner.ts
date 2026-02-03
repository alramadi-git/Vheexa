import { NextRequest, NextResponse } from "next/server";

import authenticatedMiddleware from "./authenticate";
import unauthenticatedMiddleware from "./unauthenticated";

export default function partnerMiddleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner", 6))
    return NextResponse.next();

  let middlewares = authenticatedMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  middlewares = unauthenticatedMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  return NextResponse.next();
}
