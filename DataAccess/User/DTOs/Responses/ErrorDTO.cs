namespace DataAccess.User.DTOs.Responses;

public enum STATUS_CODE
{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409
}

public class ErrorDTO : Exception
{
    public STATUS_CODE StatusCode { get; set; }

    public ErrorDTO(STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
    }
}