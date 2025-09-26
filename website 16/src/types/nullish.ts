type TUndefinable<T> = T | undefined;

type TNullable<T> = T | null;

type TNullish<T> = TUndefinable<T> | TNullable<T>;

export type { TUndefinable, TNullable, TNullish };
