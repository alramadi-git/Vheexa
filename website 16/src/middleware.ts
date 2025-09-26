import { NextRequest, NextResponse } from "next/server";
import NextIntlMiddleware from "@/middlewares/next-intl";

export default function middleware(request: NextRequest) {
  const redirect = NextIntlMiddleware(request);
  if (!redirect.ok) return redirect;

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
