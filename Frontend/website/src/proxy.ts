import { NextRequest, NextResponse } from "next/server";

import nextIntlProxy from "@/proxies/next-intl";

import partnerProxy from "./partner/proxies/partner";

export default function middleware(request: NextRequest): NextResponse {
  let middlewares = NextResponse.next();
  if (!request.nextUrl.pathname.startsWith("/api", 6)) {
    middlewares = nextIntlProxy(request);
    if (!middlewares?.ok) return middlewares;
  }

  middlewares = partnerProxy(request);
  if (!middlewares?.ok) return middlewares;

  return middlewares;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
