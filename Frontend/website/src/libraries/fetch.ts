class ClsFetch {
  private readonly _domain: string;
  private readonly _basePath: string;
  private readonly _headers: RequestInit["headers"];

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
    this._headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };
  }

  private _url(path: string): string {
    return `${this._domain}${this._basePath}${path}`;
  }

  public async get(path: string): Promise<Response> {
    return await fetch(this._url(path), {
      method: "GET",
      headers: this._headers,
    });
  }

  public async post(path: string, data: unknown): Promise<Response> {
    return await fetch(this._url(path), {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
}

export { ClsFetch };
