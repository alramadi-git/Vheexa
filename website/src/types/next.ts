import { LOCALE } from "@/i18n/routing";

import type { UUID } from "crypto";
import type { ReactNode } from "react";

type TParams<GTParams extends object> = {
  params: Promise<GTParams>;
};
type TParamsExtra = {
  TLocale: {
    locale: LOCALE;
  };
  TUUID: {
    uuid: UUID;
  };
};

type TContext<GTContext extends object> = TParams<GTContext>;

type TSearchParams<GTSearchParams extends object> = {
  searchParams: Promise<GTSearchParams>;
};

type TChildren<GTChildren extends ReactNode = ReactNode> = {
  children: GTChildren;
};

type TLayoutMetadata<GTParams extends object = object> = TParams<
  GTParams & TParamsExtra["TLocale"]
>;

type TLayoutComponent<
  GTParams extends object = object,
  GTChildren extends ReactNode = ReactNode,
> = TParams<GTParams & TParamsExtra["TLocale"]> & TChildren<GTChildren>;

type TPageMetadata<
  GTParams extends object = object,
  GTSearchParams extends object = object,
> = TParams<GTParams & TParamsExtra["TLocale"]> & TSearchParams<GTSearchParams>;

type TPageComponent<
  GTParams extends object = object,
  GTSearchParams extends object = object,
> = TParams<GTParams & TParamsExtra["TLocale"]> & TSearchParams<GTSearchParams>;

export type {
  TParamsExtra,
  TContext,
  TSearchParams,
  TChildren,
  TLayoutMetadata,
  TLayoutComponent,
  TPageMetadata,
  TPageComponent,
};
