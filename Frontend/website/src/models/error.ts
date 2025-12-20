class ClsErrorModel extends Error {
  public readonly statusCode: number;

  public constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export { ClsErrorModel };
