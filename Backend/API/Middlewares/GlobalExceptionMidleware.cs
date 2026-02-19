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
            ArgumentException argExp => (400, argExp.Message),
            ValidationException valExp => (400, string.Join("; ", valExp.Errors.Select(e => e.ErrorMessage))),
            DbUpdateException dbExp when
                dbExp.InnerException?.Message.Contains("foreign key") == true => (400, "Referenced record does not exist"),
            KeyNotFoundException => (404, "Resource not found"),
            InvalidOperationException invOpExp when
                invOpExp.Message.Contains("sequence contains no elements") => (404, "The requested resource was not found"),
            DbUpdateException dbExp when
                dbExp.InnerException?.Message.Contains("duplicate") == true => (409, "A record with this information already exists"),
            DbUpdateException dbExp when
                dbExp.InnerException?.Message.Contains("unique constraint") == true => (409, "Duplicate entry detected"),
            DbUpdateConcurrencyException => (409, "The record was modified by another user"),
            DbUpdateException dbExp => (500, "Database error occurred"),
            HttpRequestException httpExp when httpExp.Message.Contains("ImageKit") => (503, "Image upload service temporarily unavailable"),
            TaskCanceledException => (503, "Request timed out"),
            IndexOutOfRangeException => (500, "Data processing error"),
            _ => (500, exception.Message)
        };

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "text/plain";

        await httpContext.Response.WriteAsync(message, cancellationToken);

        return true;
    }
}