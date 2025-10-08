namespace DataAccess.User.DTOs.Responses;

public enum STATUS_CODE
{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,

    INTERNAL_SERVER_ERROR = 500
}

public class Error
{
    public string Field { get; set; }
    public string Message { get; set; }

    public Error(string field, string message)
    {
        Field = field;
        Message = message;
    }
}

public class ExceptionDTO : Exception
{
    public STATUS_CODE StatusCode { get; set; }
    public IEnumerable<Error> Errors { get; set; }

    public ExceptionDTO(STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
        Errors = [];
    }

    public ExceptionDTO(STATUS_CODE statusCode, IEnumerable<Error> errors, string message)
    : base(message)
    {
        StatusCode = statusCode;
        Errors = errors;
    }
}