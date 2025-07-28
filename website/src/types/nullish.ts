type TNullable<TData> = TData | null;
type TUndefinable<TData> = TData | undefined;
type TNullish<TData> = TNullable<TData> | TUndefinable<TData>;

export type { TNullish, TNullable, TUndefinable };
