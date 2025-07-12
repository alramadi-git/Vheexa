type TUndefinable<TData> = TData | undefined;
type TNullable<TData> = TData | null;
type TNullish<TData> = TNullable<TData> | TUndefinable<TData>;

export type { TUndefinable, TNullable, TNullish };
