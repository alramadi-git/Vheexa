import { NextRequest, NextResponse } from "next/server";

import nextIntlMiddleware from "@/middlewares/next-intl";

import partnerMiddleware from "./middlewares/[partner]/partner";
import userMiddleware from "./middlewares/[user]/user";

export default function middleware(request: NextRequest): NextResponse {
  let middlewares = nextIntlMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  // middlewares = partnerMiddleware(request);
  // if (middlewares?.ok !== true) return middlewares;

  middlewares = userMiddleware(request);
  if (middlewares?.ok !== true) return middlewares;

  return middlewares;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
