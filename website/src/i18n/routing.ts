import { defineRouting } from "next-intl/routing";

export enum LOCALE {
  ENGLISH = "en",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LOCALE),

  // Used when no locale matches
  defaultLocale: LOCALE.ENGLISH,
});
