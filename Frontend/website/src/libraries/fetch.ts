class ClsFetch {
  protected readonly _domain: string;
  public constructor(domain: string) {
    this._domain = domain;
  }

  public async get(path: string, token?: string): Promise<Response> {
    return await fetch(`${this._domain}${path}`, {
      method: "GET",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
  }
  public async post(
    path: string,
    data?: BodyInit,
    token?: string,
  ): Promise<Response> {
    return await fetch(`${this._domain}${path}`, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
      body: data,
    });
  }
  public async delete(path: string, token?: string): Promise<Response> {
    return await fetch(`${this._domain}${path}`, {
      method: "DELETE",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
  }
}

export { ClsFetch };
