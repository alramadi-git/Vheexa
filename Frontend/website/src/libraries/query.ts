import { tUndefinable } from "@/types/nullish";

class ClsQuery extends URLSearchParams {
  public override set(name: string, value?: string): void;
  public override set(name: string, value: string[]): void;
  public override set(
    name: string,
    value: tUndefinable<string> | string[],
  ): void {
    if (value === undefined) return;

    if (typeof value === "string") {
      super.set(name, value);
      return;
    } else if (Array.isArray(value)) {
      value.forEach((item) => super.append(name, item));
      return;
    }
  }

  public override toString(): string {
    const queryString = super.toString();
    return queryString.length === 0 ? "" : `?${queryString}`;
  }
}

export { ClsQuery as ClsQuery };
