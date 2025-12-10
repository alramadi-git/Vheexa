class ClsFetch {
  protected readonly _domain: string;
  protected readonly _basePath: string;
  protected readonly _baseUrl: string;

  protected readonly _headers: RequestInit["headers"];

  public constructor(domain: string, basePath: string);
  public constructor(
    domain: string,
    basePath: string,
    headers: RequestInit["headers"],
  );
  public constructor(
    domain: string,
    basePath: string,
    headers: RequestInit["headers"] = {},
  ) {
    this._domain = domain;
    this._basePath = basePath;
    this._baseUrl = `${this._domain}$${this._basePath}`;
    this._headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };
  }

  protected _generateUrl(path: string): string {
    return `${this._domain}${this._basePath}${path}`;
  }

  public async get(
    path: string,
    headers: RequestInit["headers"] = {},
  ): Promise<Response> {
    return await fetch(this._generateUrl(path), {
      method: "GET",
      headers: { ...this._headers, ...headers },
    });
  }

  public async post(
    path: string,
    data: unknown,
    headers: RequestInit["headers"] = {},
  ): Promise<Response> {
    return await fetch(this._generateUrl(path), {
      method: "POST",
      headers: { ...this._headers, ...headers },
      body: JSON.stringify(data),
    });
  }

  public async patch(
    path: string,
    data: unknown,
    headers: RequestInit["headers"] = {},
  ): Promise<Response> {
    return await fetch(this._generateUrl(path), {
      method: "PATCH",
      headers: { ...this._headers, ...headers },
      body: JSON.stringify(data),
    });
  }

  public async delete(
    path: string,
    headers: RequestInit["headers"] = {},
  ): Promise<Response> {
    return await fetch(this._generateUrl(path), {
      method: "DELETE",
      headers: { ...this._headers, ...headers },
    });
  }
}

export { ClsFetch };
