import { NextRequest, NextResponse } from "next/server";

import UserMiddleware from "./middlewares/user/user";
import NextIntlMiddleware from "@/middlewares/next-intl";

export default function middleware(request: NextRequest): NextResponse {
  let middlewares = NextIntlMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  middlewares = UserMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
