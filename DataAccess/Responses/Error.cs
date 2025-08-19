using DataAccess.Responses.interfaces;

namespace DataAccess.Responses;

public class Error : Exception, IResponse
{
    public Error(string message)
    : base(message) { }
}