import { eHttpStatusCode } from "@/enums/http-status-code";

type tErrorService = {
  isSuccess: false;
  message: string;
  httpStatusCode?: eHttpStatusCode;
};

class ClsErrorService extends Error {
  public readonly httpStatusCode?: eHttpStatusCode;

  public constructor(message: string);
  public constructor(message: string, httpStatusCode: eHttpStatusCode);
  public constructor(message: string, httpStatusCode?: eHttpStatusCode) {
    super(message);
    this.httpStatusCode = httpStatusCode;
  }
}

export type { tErrorService };
export { ClsErrorService };
