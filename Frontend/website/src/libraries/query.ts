class ClsQuery extends URLSearchParams {
  public override set(name: string, value?: string): void {
    if (value !== undefined) super.set(name, value);
  }
  public setArray(name: string, values: string[]): void {
    values.forEach((value) => super.append(name, value));
  }

  public override toString(): string {
    const queryString = super.toString();
    return queryString.length === 0 ? "" : `?${queryString}`;
  }
}

export { ClsQuery as ClsQuery };
