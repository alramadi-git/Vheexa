using Database.Dtos;
using Database.Dtos.Response;

namespace API.Models;

public class FailedModel
{
    public int StatusCode { get; set; }
    public IssueExceptionDTO[] Issues { get; set; } = [];

    public string Message { get; set; }

    public FailedModel(int statusCode, string message)
    {
        StatusCode = statusCode;
        Message = message;
    }

    public FailedModel(int statusCode, string message, IssueExceptionDTO[] issues)
    : this(statusCode, message)
    {
        Issues = issues;
    }
}