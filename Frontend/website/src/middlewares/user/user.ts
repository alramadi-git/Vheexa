import { NextRequest, NextResponse } from "next/server";
import NonAuthenticatedPagesMiddleware from "./non-authenticated-pages";

export default function UserMiddleware(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.includes("/user")) return NextResponse.next();
  
  /** pages you should not access when you are authenticated */
  const middlewares = NonAuthenticatedPagesMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  return NextResponse.next();
}
