import { LOCALE } from "@/i18n/routing";

type TParams<GTParams> = {
  params: Promise<GTParams>;
};

type TParamsLocale<GTExtraParams = {}> = TParams<
  GTExtraParams & {
    locale: LOCALE;
  }
>;

export type { TParams, TParamsLocale };
