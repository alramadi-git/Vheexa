namespace Database.DTOs;

public enum STATUS_CODE
{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

public class IssueExceptionDTO
{
    public string Field { get; set; }
    public string Message { get; set; }

    public IssueExceptionDTO(string field, string message)
    {
        Field = field;
        Message = message;
    }
}

public class ExceptionDTO : Exception
{
    public STATUS_CODE StatusCode { get; set; }
    public IssueExceptionDTO[] Issues { get; set; } = [];

    public ExceptionDTO(STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
    }

    public ExceptionDTO(STATUS_CODE statusCode, string message, IssueExceptionDTO[] issues)
    : this(statusCode, message)
    {
        Issues = issues;
    }
}