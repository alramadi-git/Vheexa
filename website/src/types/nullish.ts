type TUndefinable<GTData> = GTData | undefined;
type TNullable<GTData> = GTData | null;
type TNullish<GTData> = TNullable<GTData> | TUndefinable<GTData>;

export type { TUndefinable, TNullable, TNullish };
