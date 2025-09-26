import { defineRouting } from "next-intl/routing";

export enum LOCALE {
  AR_SA = "ar-SA",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LOCALE),

  // Used when no locale matches
  defaultLocale: LOCALE.AR_SA,
});
