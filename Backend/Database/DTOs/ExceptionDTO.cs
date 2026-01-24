namespace Database.DTOs;


public class ClsExceptionDTO : Exception
{
    public enum STATUS_CODE
    {
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        CONFLICT = 409,
        INTERNAL_SERVER_ERROR = 500
    }
    public STATUS_CODE StatusCode { get; set; }

    public ClsExceptionDTO(STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
    }
}