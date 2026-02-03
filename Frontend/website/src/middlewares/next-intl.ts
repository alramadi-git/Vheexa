import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const nextIntlMiddleware = createMiddleware(routing);

export default nextIntlMiddleware;
