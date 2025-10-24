import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const NextIntlMiddleware = createMiddleware(routing);

export default NextIntlMiddleware;
