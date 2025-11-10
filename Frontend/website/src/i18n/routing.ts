import { defineRouting } from "next-intl/routing";

export enum eLocale {
  enUs = "en-US",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(eLocale),

  // Used when no locale matches
  defaultLocale: eLocale.enUs,
});
