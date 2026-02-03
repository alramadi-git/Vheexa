import { NextRequest, NextResponse } from "next/server";

import authenticatedProxy from "./authenticate";
import unauthenticatedProxy from "./unauthenticated";

export default function partnerProxy(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/partner", 6))
    return NextResponse.next();

  let middlewares = authenticatedProxy(request);
  if (!middlewares?.ok) return middlewares;

  middlewares = unauthenticatedProxy(request);
  if (!middlewares?.ok) return middlewares;

  return NextResponse.next();
}
