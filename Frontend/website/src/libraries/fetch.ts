import { tNullable } from "@/types/nullish";

class ClsFetch {
  protected readonly _domain: string;
  protected readonly _headers: HeadersInit;

  public constructor(domain: string) {
    this._domain = domain;
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  public async get(
    path: string,
    token: tNullable<string> = null,
  ): Promise<Response> {
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
    data: tNullable<string | FormData> = null,
    token: tNullable<string> = null,
  ): Promise<Response> {
    return await fetch(`${this._domain}${path}`, {
      method: "POST",
      headers: {
        ...(data instanceof FormData ? {} : this._headers),
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      body: data,
    });
  }
  public async delete(
    path: string,
    token: tNullable<string> = null,
  ): Promise<Response> {
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
