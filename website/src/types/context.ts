import type { TParams, TParamsLocale } from "@/types/params";

type TContext<GTParams> = TParams<GTParams>;

type TContextLocale<GTParamsLocale> = TParamsLocale<GTParamsLocale>;

export type { TContext, TContextLocale };
