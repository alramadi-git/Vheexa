type tUndefinable<T> = T | undefined;

type tNullable<T> = T | null;

type tNullish<T> = tUndefinable<T> | tNullable<T>;

export type { tUndefinable, tNullable, tNullish };
