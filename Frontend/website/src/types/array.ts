type tCallback<tValue, tReturn>  = (value: tValue, index: number, array: Array<tValue>) => tReturn;

export type {tCallback}