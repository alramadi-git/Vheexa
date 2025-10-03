import { defineRouting } from "next-intl/routing";

export enum LOCALE {
  EN_US = "en-US",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LOCALE),

  // Used when no locale matches
  defaultLocale: LOCALE.EN_US,
});
