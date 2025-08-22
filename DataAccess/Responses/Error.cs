using DataAccess.Responses.interfaces;

namespace DataAccess.Responses;

public class Error : Exception, IResponse
{
    public enum STATUS
    {
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        CONFLICT = 409
    }

    public STATUS Status { get; set; }

    public Error(STATUS status, string message)
    : base(message)
    {
        Status = status;
    }
}