import type { TParams, TParamsLocale } from "@/types/params";

type TContext<GTParams> = TParams<GTParams>;

type TContextLocale<GTParams> = TParamsLocale<GTParams>;

export type { TContext, TContextLocale };
