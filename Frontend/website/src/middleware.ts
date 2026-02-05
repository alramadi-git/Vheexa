import { NextRequest, NextResponse } from "next/server";

import nextIntlMiddleware from "@/middlewares/next-intl";

import partnerMiddleware from "./partner/middlewares/partner";
import userMiddleware from "./user/middlewares/user";

export default function middleware(request: NextRequest): NextResponse {
  let middlewares = NextResponse.next();
  if (!request.nextUrl.pathname.startsWith("/api", 6)) {
    middlewares = nextIntlMiddleware(request);
    if (!middlewares?.ok) return middlewares;
  }

  middlewares = partnerMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  middlewares = userMiddleware(request);
  if (!middlewares?.ok) return middlewares;

  return middlewares;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
