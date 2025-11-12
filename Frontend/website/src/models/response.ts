import { tPaginationModel } from "@/models/pagination";

type tSuccessOneModel<tData> = {
  data: tData;
};
type tSuccessManyModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

type tIssueModel = {
  field: string;
  message: string;
};
type tFailedModel = {
  statusCode: number;
  message: string;

  issues: tIssueModel[];
};

class ClsErrorModel extends Error {
  public readonly statusCode: number;
  public readonly issues: tIssueModel[];

  constructor(statusCode: number, message: string);
  constructor(statusCode: number, message: string, issues: tIssueModel[]);
  constructor(statusCode: number, message: string, issues: tIssueModel[] = []) {
    super(message);

    this.statusCode = statusCode;
    this.issues = issues;
  }
}

type tResponseOneModel<tData> = tFailedModel | tSuccessOneModel<tData>;
type tResponseManyModel<tData> = tFailedModel | tSuccessManyModel<tData>;

export type {
  tSuccessOneModel,
  tSuccessManyModel,
  tIssueModel,
  tFailedModel,
  tResponseOneModel,
  tResponseManyModel,
};
export { ClsErrorModel };
