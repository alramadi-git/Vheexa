type tIssueModel = {
  field: string;
  message: string;
};

type tFailedModel = {
  statusCode: number;
  issues: tIssueModel[];
  message: string;
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

export type { tIssueModel, tFailedModel };
export { ClsErrorModel };
