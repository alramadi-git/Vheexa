type Undefinable<TData> = TData | undefined;
type Nullable<TData> = TData | null;
type Nullish<TData> = Nullable<TData> | Undefinable<TData>;

export type { Undefinable, Nullable, Nullish };
