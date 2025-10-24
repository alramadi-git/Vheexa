import { tIssueModel } from "@/models/failed";
import { tPaginationModel } from "@/models/pagination";

import { ZodError } from "zod/v4";

type tFailedService = {
  isSuccess: false;
  statusCode: number;
  statusText: string;
  message: string;
  issues: tIssueModel[];
};

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

type tResponseOneService<tData> = tFailedService | tSuccessOneService<tData>;
type tResponseManyService<tData> = tFailedService | tSuccessManyService<tData>;

class ErrorService extends Error {
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

abstract class Service {
  protected _APIUrl: string = process.env.NEXT_PUBLIC_API_URL!;

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
            field: issue.path[0].toString(),
            message: issue.message,
          })),
        } satisfies tFailedService;

      if (error instanceof ErrorService)
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
  tFailedService,
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
};
export { ErrorService, Service };
