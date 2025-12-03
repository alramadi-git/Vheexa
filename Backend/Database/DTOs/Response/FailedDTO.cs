namespace Database.DTOs.Response;

public enum HTTP_STATUS_CODE
{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

public class IssueFailedDTO
{
    public string Field { get; set; }
    public string Message { get; set; }

    public IssueFailedDTO(string field, string message)
    {
        Field = field;
        Message = message;
    }
}

public class FailedDTO : Exception
{
    public HTTP_STATUS_CODE StatusCode { get; set; }
    public IssueFailedDTO[] Issues { get; set; } = [];

    public FailedDTO(HTTP_STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
    }

    public FailedDTO(HTTP_STATUS_CODE statusCode, string message, IssueFailedDTO[] issues)
    : this(statusCode, message)
    {
        Issues = issues;
    }
}