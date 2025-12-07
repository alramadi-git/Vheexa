import { tPaginationModel } from "@/models/pagination";
import { tIssueModel } from "@/models/failed";

import { ZodError } from "zod";

type tSuccessOneService<tData> = {
  isSuccess: true;
  statusCode: number;
  statusText: string;
  data: tData;
};
type tSuccessManyService<tData> = {
  isSuccess: true;
  statusCode: number;
  statusText: string;

  data: tData[];
  pagination: tPaginationModel;
};

type tFailedService = {
  isSuccess: false;
  statusCode: number;
  statusText: string;
  message: string;
  issues: tIssueModel[];
};

type tResponseOneService<tData> = tFailedService | tSuccessOneService<tData>;
type tResponseManyService<tData> = tFailedService | tSuccessManyService<tData>;

class ClsErrorService extends Error {
  public statusCode: number;
  public statusText: string;
  public issues: tIssueModel[];

  constructor(statusCode: number, statusText: string, message: string);
  constructor(
    statusCode: number,
    statusText: string,
    message: string,
    issues: tIssueModel[],
  );
  constructor(
    statusCode: number,
    statusText: string,
    message: string,
    issues: tIssueModel[] = [],
  ) {
    super(message);

    this.statusCode = statusCode;
    this.statusText = statusText;
    this.issues = issues;
  }
}

abstract class ClsAbstractService {
  protected _url: string;

  protected constructor(path: string) {
    this._url = `${process.env.NEXT_PUBLIC_API_URL!}${path}`;
  }

  protected async catcher<tReturn>(
    callback: () => Promise<tFailedService | tReturn>,
  ) {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof ZodError)
        return {
          isSuccess: false,
          statusCode: 400,
          statusText: "Bad Request",
          message: error.message,
          issues: error.issues.map((issue) => ({
            field: issue.path
              .map((p) => (typeof p === "number" ? `[${p}]` : p))
              .join("."),
            message: issue.message,
          })),
        } satisfies tFailedService;

      if (error instanceof ClsErrorService)
        return {
          isSuccess: false,
          statusCode: error.statusCode,
          statusText: error.statusText,
          message: error.message,
          issues: error.issues,
        } satisfies tFailedService;

      return {
        isSuccess: false,
        statusCode: 500,
        statusText: "Internal Server Error",
        message: "Something went wrong",
        issues: [],
      } satisfies tFailedService;
    }
  }
}

export type {
  tSuccessOneService,
  tSuccessManyService,
  tFailedService,
  tResponseOneService,
  tResponseManyService,
};
export { ClsErrorService, ClsAbstractService };
