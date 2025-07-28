import { type TLocale } from "@/i18n/routing";

type TParams<TType> = {
  params: Promise<TType>;
};
type TParamsLocale = TParams<{ locale: TLocale }>;

export type { TParams, TParamsLocale };
