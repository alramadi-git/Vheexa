import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const nextIntlProxy = createMiddleware(routing);

export default nextIntlProxy;
