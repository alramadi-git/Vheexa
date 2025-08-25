namespace DataAccess.ResponseDTOs;

public enum ERROR_RESPONSE_DTO_STATUS_CODE
{
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409
}

public class ErrorResponseDTO : Exception
{
    public ERROR_RESPONSE_DTO_STATUS_CODE StatusCode { get; set; }

    public ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE statusCode, string message)
    : base(message)
    {
        StatusCode = statusCode;
    }
}