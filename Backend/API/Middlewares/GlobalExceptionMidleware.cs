using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Diagnostics;

using FluentValidation;

namespace API.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var (statusCode, message) = exception switch
        {
            ValidationException valEx => (400, string.Join("; ", valEx.Errors.Select(e => e.ErrorMessage))),
            ArgumentException argEx => (400, argEx.Message),
            InvalidOperationException invOpEx when
                invOpEx.Message.Contains("sequence contains no elements") => (404, "The requested resource was not found"),
            KeyNotFoundException => (404, "Resource not found"),
            UnauthorizedAccessException => (401, "Authentication required"),
            DbUpdateException dbEx when
                dbEx.InnerException?.Message.Contains("duplicate") == true => (409, "A record with this information already exists"),
            DbUpdateException dbEx when
                dbEx.InnerException?.Message.Contains("foreign key") == true => (400, "Referenced record does not exist"),
            DbUpdateException dbEx when
                dbEx.InnerException?.Message.Contains("unique constraint") == true => (409, "Duplicate entry detected"),
            DbUpdateConcurrencyException => (409, "The record was modified by another user"),
            DbUpdateException dbEx => (500, "Database error occurred"),
            HttpRequestException httpEx when httpEx.Message.Contains("ImageKit") => (503, "Image upload service temporarily unavailable"),
            TaskCanceledException => (503, "Request timed out"),
            IndexOutOfRangeException => (500, "Data processing error"),
            _ => (500, "An unexpected error occurred")
        };

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "text/plain";

        await httpContext.Response.WriteAsync(message, cancellationToken);

        return true;
    }
}